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
    }
})
const styleModel=mongoose.model("Style",styleSchema)
export default styleModel;