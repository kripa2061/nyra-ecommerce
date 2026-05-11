import styleModel from '../models/styleModel.js';
import { supabase } from '../config/supabase.js';

export const addStyle = async (req, res, next) => {
  try {
    const { name, mood, category, price,stock,description,sizes,color} = req.body;

    if (!name || !mood || !price) {
      return res.status(400).json({ success: false, message: "name, mood and price are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const images = [];
    for (let file of req.files) {
      const fileName = `images/${Date.now()}_${file.originalname}`;
      const { error } = await supabase.storage.from("style").upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype
      });
      if (error) {
        return res.status(500).json({ success: false, message: "Error uploading image", error });
      }
      const { data: urlData } = supabase.storage.from("style").getPublicUrl(fileName);
      images.push(urlData.publicUrl);
    }

    const style = await styleModel.create({
      name: name.trim(),
      mood: mood.trim(),
      category: category?.trim(),
      price: Number(price),
      images,
      stock:stock.trim(),
      sizes:sizes.trim(),
      color:color.trim(),
      description:description.trim()
    });

    return res.status(201).json({ success: true, message: "Style created successfully", data: style });

  } catch (error) {
    next(error);   
  }
};

export const getStyle = async (req, res, next) => {
  try {
    const style = await styleModel.find({});
    return res.status(200).json({ success: true, data: style });  // ✅ array directly
  } catch (error) {
    next(error);  
  }
};

export const getStyleById = async (req, res, next) => {
  try {
    const style = await styleModel.findById(req.params.id);
    if (!style) {
      return res.status(404).json({ success: false, message: "Style not found" });
    }
    return res.status(200).json({ success: true, data: style });
  } catch (error) {
    next(error);   // ✅ always pass error
  }
};

export const removeStyle = async (req, res, next) => {
  try {
    const style = await styleModel.findByIdAndDelete(req.params.id);
    if (!style) {
      return res.status(404).json({ success: false, message: "Style not found" });
    }
    return res.status(200).json({ success: true, message: "Style deleted successfully" });
  } catch (error) {
    next(error);   
  }
};