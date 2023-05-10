import express from "express";
const userRouter = express.Router();
import auth from "../../middleware/auth.mjs";
import { Product } from "../Model/productModel.mjs";
import User from "../Model/userModel.mjs";
import Order from "../Model/orderModel.mjs";

//Add Product
userRouter.post('/api/add-to-cart', auth, async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        let user = await User.findById(req.user)
        if (user.cart.length == 0) {
            user.cart.push({ product, quantity: 1 });
        } else {
            let isProdctFound = false;
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].product._id.equals(product._id)) {
                    isProdctFound = true;
                }
            }

            if (isProdctFound) {
                let productFind = user.cart.find((element) => element.product._id.equals(product._id));
                productFind.quantity += 1;
            } else {
                user.cart.push({ product, quantity: 1 });
            }
        }
        user = await user.save();
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})


userRouter.delete('/api/remove-from-cart/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        let user = await User.findById(req.user)
        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product._id.equals(product._id)) {
                if (user.cart[i].quantity == 1) {
                    user.cart.splice(i, 1);
                } else {
                    user.cart[i].quantity -= 1;
                }
            }
        }
        user = await user.save();
        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

//save user address

userRouter.post('/api/save-user-address', auth, async (req, res) => {
    try {
        const { address } = req.body;
        let user = await User.findById(req.user);
        user.address = address;
        user = await user.save();
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})





//order Product

userRouter.post('/api/order', auth, async (req, res) => {
    try {
        const { cart, totalPrice, address } = req.body;
        let products = [];
        for (let i = 0; i < cart.length; i++) {
            let product = await Product.findById(cart[i].product._id)
            if (product.quantity >= cart[i].quantity) {
                product.quantity -= cart[i].quantity;
                products.push({ product, quantity: cart[i].quantity });
                await product.save();
            } else {
                return res.status(400).json({ msg: `${product} is out of stock ! ` });
            }
        }
        let user = await User.findById(req.user);
        user.cart = [];
        user = await user.save();

        ///save order

        let order = new Order({
            products,
            totalPrice,
            address,
            userId: req.user,
            orderedAt: new Date().getTime(),
        })
        order = await order.save();
        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})



//get all orders for me

userRouter.get("/api/orders/me", auth, async (req, res) => {
    try {
        console.log(req.user)
        const orders = await Order.find({ userId: req.user });
       

        res.json(orders);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});



export default userRouter;