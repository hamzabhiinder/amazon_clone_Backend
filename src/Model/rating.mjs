import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        required: true
    }
})


export default ratingSchema;