import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    fabric: {
        type: String
    },
    review: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: Number,
            comment: String
        }
    ],
    sizes: [String],
    colors: [String],
    stock: {
        type: Number,
        default: 0
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const productModel = mongoose.model("product", productSchema)
export default productModel;