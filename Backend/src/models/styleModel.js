import mongoose from "mongoose";
const styleSchema=new mongoose.Schema({
    mood:{
        type:String,
        required:true
    },
    category:{
         type:String,
        
    },
    images:[String],
    price:{
        type:Number,
        required:true
    },
    colors:{
        type:String
    },
    sizes:{
        type:String
    },
    tags:{
        type:String
    },
      stock: {
        type: Number,
        default: 0
    },
     createdAt: {
        type: Date,
        default: Date.now
    },   isNewArrival: {
        type: Boolean,
        default: false
    },
    isOffer: {
        type: Boolean,
        default: false
    },
      discountPercent: { type: Number, default: 0 },
    fabric: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const styleModel=mongoose.model("Style",styleSchema)
export default styleModel;