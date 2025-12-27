import React, { useState} from "react";
import type { ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import { toast } from "react-toastify";


// 1. تعريف أنواع البيانات لـ TypeScript
interface PartFormData {
  name: string;
  sku: string;
  quantity: string | number;
  category: "oils" | "filters" | "parts";
  replacements: string;
}

function AddNewPart() {

  const [loading, setLoading] = useState<boolean>(false);
  
  // 2. حالة النموذج مع الأنواع الجديدة
  const [formData, setFormData] = useState<PartFormData>({
    name: "",
    sku: "",
    quantity: "",
    category: "parts", // القيمة الافتراضية
    replacements: "",
  });

  // معالج تغيير المدخلات
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة
    if (!formData.name || !formData.sku || !formData.quantity) {
      toast.warning("Name, SKU, and Quantity are required!");
      return;
    }

    setLoading(true);

    try {
      // مكان الـ API (Placeholder)
      // ملاحظة: يمكنك استبدال الرابط أدناه بـ API الخاص بك لاحقاً
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        ...formData,
        userId: 1,
      });

      // منطق النجاح
      setLoading(false);
      
      toast.success(`Part added successfully! ✅`, {
        position: "top-right",
        autoClose: 3000,
      });

      // مسح النموذج بعد الإرسال
      setFormData({
        name: "",
        sku: "",
        quantity: "",
        category: "parts",
        replacements: "",
      });

    } catch (error) {
      console.error("Add Part Error:", error);
      toast.error("Failed to add part. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      
      
      {/* Content Area */}
      <div className="md: flex flex-col items-center">
        
        <h1 className="text-3xl font-bold text-amber-700 mb-10">
          Add New Part
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Row 1: Name & SKU */}
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

            {/* Row 2: Quantity & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 font-semibold text-sm">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  value={formData.quantity}
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

            {/* Row 3: Replacements */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 font-semibold text-sm">Replacements / Alternative Numbers</label>
              <textarea
                name="replacements"
                rows={3}
                placeholder="e.g. BD-8800, BD-7700..."
                value={formData.replacements}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-95
                ${loading ? "bg-cyan-400 cursor-not-allowed" : "bg-yellow-300 hover:bg-yellow-500"}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                   Processing...
                </span>
              ) : (
                "Create Part"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewPart;