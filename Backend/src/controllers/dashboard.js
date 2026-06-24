import user from "../models/user.js"
import orderModel from "../models/orderModel.js"
import productModel from "../models/productModel.js"
export const getDashboardData=async(req,res,next)=>{
    try {
        const totalUser=await user.countDocuments();
        const totalOrder=await orderModel.countDocuments()
        const totalProduct=await productModel.countDocuments()
        const orders=await orderModel.find()
         const totalRevenue = orders.reduce(
      (acc, order) => acc + order.amount,
      0
    )
    res.json({
        totalUser,
        totalOrder,
        totalProduct,
        totalRevenue
    })
    } catch (error) {
        next(error)
    }
}
export const adminLogin=async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}
export const adminLogout=async(req,res,next)=>{

}