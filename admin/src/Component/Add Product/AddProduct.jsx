import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    season: "",
    fabric: "",
    sizes: "",
    colors: "",
    stock: "",
    isNewArrival: false,
    isOffer: false,
    discountPercent: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImages = (e) => {
    setImages(e.target.files);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // required fields
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("season", form.season);

      // optional fields
      formData.append("fabric", form.fabric);
      formData.append("sizes", form.sizes);
      formData.append("colors", form.colors);
      formData.append("stock", form.stock);
      formData.append("isNewArrival", form.isNewArrival);
      formData.append("isOffer", form.isOffer);
      formData.append("discountPercent", form.discountPercent);

      // images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await axios.post(
        "http://localhost:8000/api/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Product Added Successfully!");

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        season: "",
        fabric: "",
        sizes: "",
        colors: "",
        stock: "",
        isNewArrival: false,
        isOffer: false,
        discountPercent: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={addProduct}>
        <h2>Add Product</h2>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />

        <input name="season" placeholder="Season" value={form.season} onChange={handleChange} />

        <input name="fabric" placeholder="Fabric (optional)" value={form.fabric} onChange={handleChange} />

        <input name="sizes" placeholder="Sizes (S,M,L)" value={form.sizes} onChange={handleChange} />

        <input name="colors" placeholder="Colors (Red,Blue)" value={form.colors} onChange={handleChange} />

        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />

        <input
          name="discountPercent"
          placeholder="Discount (10 or 10%)"
          value={form.discountPercent}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="isNewArrival"
            checked={form.isNewArrival}
            onChange={handleChange}
          />
          New Arrival
        </label>

        <label>
          <input
            type="checkbox"
            name="isOffer"
            checked={form.isOffer}
            onChange={handleChange}
          />
          Offer Product
        </label>

        <input type="file" multiple onChange={handleImages} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;