import categoryModel from "../models/categoryModel.js";
import supabase from "../config/supabase.js";

// Add Category
export const addCategory = async (req, res) => {
 try {
    const { name, description } = req.body;

    if (!name || !description)
      return res.status(400).json({ message: "Missing required fields" });

    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const fileName = `categories/${Date.now()}_${req.file.originalname}`;

    // Upload image to Supabase
    const { error } = await supabase.storage
      .from("categories")
      .upload(fileName, req.file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: req.file.mimetype
      });

    if (error) return res.status(500).json({ message: "Error uploading image", error });

    const { data: { publicUrl } } = supabase.storage.from("categories").getPublicUrl(fileName);

    const newCategory = new categoryModel({
      name: name.trim(),
      description: description.trim(),
      image: publicUrl
    });

    await newCategory.save();

    res.status(201).json({ message: "Category Added Successfully", category: newCategory });

  } catch (error) {
    console.error("Add category error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Categories
export const getCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (categories.length === 0)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl;

    if (req.file) {
      const fileName = `categories/${Date.now()}_${req.file.originalname}`;
      const { error } = await supabase.storage
        .from("categories")
        .upload(fileName, req.file.buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: req.file.mimetype
        });
      if (error) return res.status(500).json({ message: "Error uploading image", error });

      const { data: { publicUrl } } = supabase.storage.from("categories").getPublicUrl(fileName);
      imageUrl = publicUrl;
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name: name.trim() }), ...(description && { description: description.trim() }), ...(imageUrl && { image: imageUrl }) },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addCategory, updateCategory, getCategory, deleteCategory };