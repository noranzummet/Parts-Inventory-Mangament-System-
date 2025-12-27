import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

interface PartFormData {
  name: string;
  sku: string;
  stock: string | number; 
  category: "oils" | "filters" | "parts";
  replacment: string;    
  location: string;      
}

function AddNewPart() {
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<PartFormData>({
    name: "",
    sku: "",
    stock: "",
    category: "parts",
    replacment: "",
    location: "p-12", 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sku || !formData.stock) {
      toast.warning("Name, SKU, and Stock are required!");
      return;
    }

    setLoading(true);

    try {
      // 1. Point to your Laragon URL
      // 2. We send 'status' because your Laravel controller validates it
      const response = await axios.post("http://localhost:8000/api/parts", {
        ...formData,
        status: "available" 
      });

      setLoading(false);
      
      toast.success(`Part ${response.data.data.name} added successfully! ✅`);

      // Reset Form
      setFormData({
        name: "",
        sku: "",
        stock: "",
        category: "parts",
        replacment: "",
        location: "p-12",
      });

    } catch (error: any) {
      console.error("Add Part Error:", error);
      // Display Laravel validation errors if they exist
      const errorMsg = error.response?.data?.message || "Failed to add part.";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="md: flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold text-amber-700 mb-10">Add New Part</h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-semibold text-sm">Part Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Brake Disc"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-semibold text-sm">SKU / Part Number *</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="e.g. BD-9901"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-semibold text-sm">Stock Quantity *</label>
                <input
                  type="number"
                  name="stock" // Changed name to 'stock'
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-semibold text-sm">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white transition-all"
                >
                  <option value="oils">Oils</option>
                  <option value="filters">Filters</option>
                  <option value="parts">Parts</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Shelf A-1"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Replacements</label>
              <textarea
                name="replacment" // Changed to 'replacment' to match your Laravel typo
                rows={3}
                placeholder="Alternative numbers..."
                value={formData.replacment}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500"}
              `}
            >
              {loading ? "Processing..." : "Create Part"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewPart;