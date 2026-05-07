import styleModel from '../models/styleModel.js';
import { supabase } from '../config/supabase.js';

const addProduct = async (req, res, next) => {

  try {
 
    const { mood, price, category,  sizes, colors,  tags} = req.body;

    if (!mood || !price ) {
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
          mood: mood.trim(),
          price: Number(price),
          category: category.trim(),
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