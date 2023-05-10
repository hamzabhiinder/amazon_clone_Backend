import mongoose from "mongoose";
import { productSchema } from "./productModel.mjs";

const orderSchema = mongoose.Schema({
    products: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    orderedAt: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },

})

const Order = mongoose.model("Order", orderSchema)

export default Order;