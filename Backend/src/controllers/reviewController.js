import productModel from "../models/productModel.js";
const addReview=async(req,res)=>{
    try {
        const{productId,userId,rating,comment}=req.body;
        if(!productId||!rating||!comment){
            return res.status(400).json({message:"missing value"})
        }
     const product=await productModel.findById(productId)
     if(!product){
       return res.status(400).json({message:"pproduct not available"}) 
     }
     product.review.push({userId,rating,comment});
    await product.save();
    return res.status(200).json({ message: "Review added successfully"})
    } catch (error) {
    return res.status(500).json({ message: error.message });  
    }
}
const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ reviews: product.review });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const reviewIndex = product.review.findIndex(r => r._id.toString() === reviewId);
    if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

    product.review.splice(reviewIndex, 1);
    await product.save();

    return res.status(200).json({ message: "Review deleted successfully", reviews: product.review });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {addReview,getReviews,deleteReview}