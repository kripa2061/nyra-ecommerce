import React, { useState } from "react";
import axios from "axios";

const Mood = () => {
  const [form, setForm] = useState({
    name: "",
    mood: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    sizes: "",
    color: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const addStyle = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("mood", form.mood);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      formData.append("sizes", form.sizes);
      formData.append("color", form.color);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await axios.post(
        "http://localhost:8000/api/style/addStyle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Style added successfully!");

      // reset
      setForm({
        name: "",
        mood: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        sizes: "",
        color: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={addStyle}>
        <h2>Add Mood Style</h2>

        <input
          name="name"
          placeholder="Style Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="mood"
          placeholder="Mood (e.g. classy, casual, party)"
          value={form.mood}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="sizes"
          placeholder="Sizes (S,M,L)"
          value={form.sizes}
          onChange={handleChange}
        />

        <input
          name="color"
          placeholder="Colors (Red,Blue)"
          value={form.color}
          onChange={handleChange}
        />

        <input type="file" multiple onChange={handleImages} />

        <button type="submit">Add Style</button>
      </form>
    </div>
  );
};

export default Mood;