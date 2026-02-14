import productModel from '../models/productModel.js';
import supabase from '../config/supabase.js';

const addProduct = async (req, res) => {
  try {
    console.log("=== New Add Product Request ===");
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { name, description, price, category, fabric, sizes, colors, stock } = req.body;

  
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const uploadedFiles = Array.isArray(req.files.images)
      ? req.files.images
      : req.files.images ? [req.files.images] : [];

    const images = [];

    for (let file of uploadedFiles) {
      console.log("Uploading file:", file.name);

      const fileName = `images/${Date.now()}_${file.name}`;

      // Upload file to Supabase
      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, file.data, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.mimetype
        });



      if (error) {
        console.error("Supabase upload error:", error);
        return res.status(500).json({ message: "Error uploading image to Supabase", error });
      }

      const { data: urlData, error: urlError } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      if (urlError) {
        console.error("Supabase getPublicUrl error:", urlError);
      }

      console.log("Supabase public URL:", urlData.publicUrl);

      images.push(urlData.publicUrl);
    }

    const sizesArray = Array.isArray(sizes) ? sizes : sizes?.split(',').map(s => s.trim()) || [];
    const colorsArray = Array.isArray(colors) ? colors : colors?.split(',').map(c => c.trim()) || [];
    const numericPrice = Number(price);
    const numericStock = Number(stock) || 0;

    const product = await productModel.create({
      name: name.trim(),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      fabric: fabric?.trim() || "",
      review: [],
      sizes: sizesArray,
      colors: colorsArray,
      stock: numericStock,
      images
    });

    return res.status(201).json({ message: "Product Created Successfully", product });

  } catch (error) {
    console.error("Add product error:", error);
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
};


const getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  addProduct,
  getProducts,
  getProductByID,
  removeProduct
};
