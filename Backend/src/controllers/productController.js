import productModel from '../models/productModel.js';
import { supabase } from '../config/supabase.js';

const addProduct = async (req, res, next) => {
     console.log("BODY:", req.body);
  try {
 
    const { name, description, price, season,category, fabric, sizes, colors, stock, isNewArrival, isOffer, discountPercent } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = [];
    for (let file of req.files) {
      const fileName = `images/${Date.now()}_${file.originalname}`;
      const { data, error } = await supabase.storage.from("products").upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype
      });
      if (error) {
        return res.status(500).json({ message: "Error uploading image to Supabase", error });
      }
      const { data: urlData } = supabase.storage.from("products").getPublicUrl(fileName);
      images.push(urlData.publicUrl);
    }

    const product = await productModel.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      season:season.trim(),
      fabric: fabric?.trim() || "",
      review: [],
      sizes: sizes ? sizes.split(",").map(s => s.trim()) : [],
      colors: colors ? colors.split(",").map(c => c.trim()) : [],
      stock: Number(stock) || 0,
      images,
      isNewArrival: isNewArrival === "true" || isNewArrival === true,
      isOffer: isOffer === "true" || isOffer === true,
      discountPercent: Number(String(discountPercent).replace("%", "")) || 0,
    });

    return res.status(201).json({ message: "Product Created Successfully", product });
  } catch (error) {
    next(error);
  }
};




const getProducts = async (req, res,next) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({ data: products });
  } catch (error) {
   next(error);
  }
};


const getProductByID = async (req, res,next) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
      next(error);
  }
};

const removeProduct = async (req, res,next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
       next(error);
  }
};
const getProductsByCategory = async (req, res, next) => {
  try {
    const categoryName = req.params.category; // keep original
    const products = await productModel.find({
      category: { $regex: new RegExp(`^${categoryName}$`, 'i') } // case-insensitive
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found in ${categoryName}` });
    }
    return res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
};
const getNewArrival = async (req, res, next) => {
  try {
    const products = await productModel.find({ isNewArrival: true }).sort({ createdAt: -1 });
    if (!products.length) return res.status(404).json({ message: "No product found" });
    return res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getOffers = async (req, res, next) => {
  try {
    const products = await productModel.find({ isOffer: true, discountPercent: { $gt: 0 } });
    if (!products.length) return res.status(404).json({ message: "No product found" });
    const data = products.map((p) => ({
      ...p._doc,
      discountedPrice: Math.round(p.price - (p.price * p.discountPercent) / 100),
    }));
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export default {
  addProduct,
  getProducts,
  getProductByID,
  removeProduct,
 getProductsByCategory,
 getNewArrival,
 getOffers
};