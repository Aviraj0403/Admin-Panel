import React, { useState } from "react";

export default function FoodVariantForm({ onSubmit }) {
  // Start with one empty variant by default
  const [variants, setVariants] = useState([
    { name: "", price: "" }
  ]);

  // Handle input changes for variants
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  // Add new empty variant row
  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  // Remove a variant row by index
  const removeVariant = (index) => {
    if (variants.length === 1) return; // keep at least one
    setVariants(variants.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (non-empty name and positive price)
    const isValid = variants.every(
      (v) => v.name.trim() !== "" && !isNaN(parseFloat(v.price)) && parseFloat(v.price) >= 0
    );

    if (!isValid) {
      alert("Please fill all variant names and valid prices.");
      return;
    }

    // Pass variants data to parent or make API call here
    onSubmit(variants);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Variants</h2>

      {variants.map((variant, idx) => (
        <div key={idx} className="flex gap-4 items-center mb-3">
          <input
            type="text"
            placeholder="Variant Name (e.g. Small, Large)"
            value={variant.name}
            onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={variant.price}
            onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
            className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => removeVariant(idx)}
            className="text-red-500 hover:text-red-700 font-bold px-2"
            aria-label={`Remove variant ${variant.name || idx + 1}`}
          >
            &times;
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        + Add Variant
      </button>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Save Variants
      </button>
    </form>
  );
}
