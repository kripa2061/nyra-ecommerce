import productModel from "../models/productModel.js";
const addReview=async(req,res,next)=>{
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
       next(error);
    }
}
const getReviews = async (req, res,next) => {
  try {
    const { productId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ reviews: product.review });
  } catch (error) {
    next(error);
  }
}
const deleteReview = async (req, res,next) => {
  try {
    const { productId, reviewId } = req.params;
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.review.find(r => r._id.toString() === reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }
    product.review = product.review.filter(r => r._id.toString() !== reviewId);
    await product.save();

    return res.status(200).json({
      message: "Review deleted successfully",
      reviews: product.review,
    });
  } catch (error) {
      next(error);
  }
};

export default {addReview,getReviews,deleteReview}