import productModel from '../models/productMode.js';

import supabase from '../config/supabase.js';

import path from "path";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, fabric, sizes, colors, stock } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = [];

    const uploadedFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    for (let file of uploadedFiles) {
      const { data, error } = await supabase.storage
        .from("products") // your storage bucket name
        .upload(`images/${Date.now()}_${file.name}`, file.data, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.mimetype
        });

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading image to Supabase" });
      }

      // Get public URL
      const { publicUrl } = supabase.storage.from("products").getPublicUrl(data.path);
      images.push(publicUrl);
    }

    const product = await productModel.create({
      name,
      description,
      price,
      category,
      fabric: fabric || "",
      review: [],
      sizes: Array.isArray(sizes) ? sizes : sizes?.split(',') || [],
      colors: Array.isArray(colors) ? colors : colors?.split(',') || [],
      stock: stock || 0,
      images
    });

    return res.status(201).json({ message: "Product Created Successfully", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({ data: products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getProductByID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(400).json({ message: "No product available" });
        }
        return res.status(200).json({ data: product });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "No product available" });
        }
        return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default {
    addProduct,
    getProducts,
    getProductByID,
    removeProduct
};
