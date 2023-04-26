import express from "express";
const adminRouter = express.Router();

import admin from "../../middleware/admin.mjs";
import Product from "../Model/productModel.mjs";


//Add Product
adminRouter.post('/admin/add-products', admin, async (req, res) => {
    try {
        const { name, description, price, quantity, category, images } = req.body

        let product = new Product(
            {
                name, description, price, quantity, category, images,
            });
        res.json(product);
        product = await product.save();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
///get all product 
adminRouter.get('/admin/get-products', admin, async (req, res) => {
    try {
        const product = await Product.find({});
        res.send(product);
        // res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



///delete specific product
adminRouter.post('/admin/delete-product', admin, async (req, res) => {
    try {
        const { id } = req.body;
        let product = await Product.findByIdAndDelete(id);
        res.json(product);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})
export default adminRouter;