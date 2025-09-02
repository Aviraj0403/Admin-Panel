import React, { useState } from "react";
import axios from "../utils/Axios"; // Your axios instance with baseURL

export default function AddCategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    displayOrder: "",
    isFeatured: false,
    isRecommended: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!formData.name.trim()) {
      setError("Name is required.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("displayOrder", formData.displayOrder || 0);
      data.append("isFeatured", formData.isFeatured);
      data.append("isRecommended", formData.isRecommended);
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Call backend API
      const res = await axios.post("/categories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setSuccessMsg("Category created successfully!");
        setFormData({
          name: "",
          description: "",
          displayOrder: "",
          isFeatured: false,
          isRecommended: false,
          image: null,
        });
      } else {
        setError(res.data.message || "Failed to create category.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Category name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
            rows={3}
          />
        </div>

        {/* Display Order */}
        <div>
          <label htmlFor="displayOrder" className="block font-medium mb-1">
            Display Order
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            type="number"
            min="0"
            placeholder="Order number"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-300"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="form-checkbox"
            />
            Featured
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isRecommended"
              checked={formData.isRecommended}
              onChange={handleChange}
              className="form-checkbox"
            />
            Recommended
          </label>
        </div>

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Category Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          {formData.image && (
            <p className="mt-1 text-sm text-gray-600">
              Selected file: {formData.image.name}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
