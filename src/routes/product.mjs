import express from "express";
const productRouter = express.Router();
import auth from "../../middleware/auth.mjs";
import { Product } from "../Model/productModel.mjs";
import Order from "../Model/orderModel.mjs";

productRouter.get('/api/products', auth, async (req, res) => {
  try {
    console.log(req.query.category);
    const product = await Product.find({ category: req.query.category });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//create a get request to search product and get them

productRouter.get('/api/products/search/:name', auth, async (req, res) => {
  try {
    console.log(req.query.category);
    const product = await Product.find({
      name: { $regex: req.params.name, $options: "i" }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// create a post request route to rate the product.
productRouter.post("/api/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



productRouter.get('/api/deal-of-day', auth, async (req, res) => {
  try {
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }
      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }

      return aSum < bSum ? 1 : -1;
    });

    res.json(products[0]);

  } catch (error) {
    res.status(500).json({ error: e.message });
  }
})



export default productRouter;