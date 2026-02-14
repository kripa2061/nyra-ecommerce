import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
  items:[
    {
        productId:{type:String,required:true},
        quantity:{type:Number,required:true}
    }
  ],
    amount:{
        type:Number,
        required:true
    },
    paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
    address:{
        type:String,
        required:true 
    },
    date:{
         type:Date,
        default:Date.now
    }
})
const orderModel=mongoose.model("order",orderSchema);
export default orderModel;