import mongoose from "mongoose";
import ratingSchema from "./rating.mjs";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    images: [{
        type: String,
        required: true,
    },],
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    //rating options
    ratings:[ratingSchema]
});

const Product=mongoose.model("Product",productSchema)

export default Product;