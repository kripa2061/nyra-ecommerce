import styleModel from '../models/styleModel.js';
import { supabase } from '../config/supabase.js';

export const addStyle = async (req, res, next) => {
  try {
    const { name, mood, category, price } = req.body;

    // Validate required fields
    if (!name || !mood || !price) {
      return res.status(400).json({ message: "name, mood and totalPrice are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = [];
    for (let file of req.files) {
      const fileName = `images/${Date.now()}_${file.originalname}`;
      const { data, error } = await supabase.storage.from("style").upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype
      });
      if (error) {
        return res.status(500).json({ message: "Error uploading image to Supabase", error });
      }
      const { data: urlData } = supabase.storage.from("style").getPublicUrl(fileName);
      images.push(urlData.publicUrl);
    }


    // Save to DB — only styleModel fields
    const style = await styleModel.create({
      name: name.trim(),
      mood: mood.trim(),
      category: category?.trim(),
      price: Number(price),
     images,
    });

    return res.status(201).json({ message: "Style created successfully", style });

  } catch (error) {
    next(error);
  }
};
export const getStyle=async(req,res,next)=>{
  try {
    const style=await styleModel.find({})
    if(!style){
    return res.status(404).json({ success: false, message: "Style not found" });
    }
    return res.status(200).json({ success:true, data:{style} });
  } catch (error) {
    next()
  }
}
export const getStyleById=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const style=await styleModel.findById(id);
    if(!style){
    return res.status(404).json({ success: false, message: "Style not found" });
    }
    return res.status(200).json({ success:true, data:{style} });
  } catch (error) {
    next()
  }
}
export const removeStyle=async(req,res,next)=>{
  try {
    const id=req.params.id;
    const style=await styleModel.findByIdAndDelete(id);
     if(!style){
    return res.status(404).json({ success: false, message: "Style not found" });
    }
    return res.status(200).json({ success:true, message:"Deleted" });
  } catch (error) {
    next()
  }
}