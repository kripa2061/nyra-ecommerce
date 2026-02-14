import mongoose from "mongoose";
const reviewSchema=new mongoose.Schema({
    "userId":{type:String,required:true},
    "rating":{
        type:Number,
        required:true
    },
    "comment":{
        type:String,
        required:true
    }
})
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
      reviewSchema
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