import React, { useState} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
// 1. تعريف واجهة البيانات (Interface)
interface Part {
  id: number;
  name: string;
  description: string;
  rating: number;
  qty: number;
  replacment: string;
  category: string;
  thumbnail: string;
}

// 2. بيانات تجريبية (Placeholder Data)
const DUMMY_PARTS: Part[] = [
  {
    id: 1,
    name: "Engine Oil Filter",
    description: "High-performance synthetic oil filter for heavy-duty engines.",
    rating: 4.8,
    qty: 120,
    replacment: "Bosch",
    category: "Maintenance",
    thumbnail: "https://via.placeholder.com/400x400?text=Oil+Filter"
  },
  {
    id: 2,
    name: "Ceramic Brake Pads",
    description: "Quiet and low-dust ceramic brake pads for smooth stopping power.",
    rating: 4.9,
    qty: 45,
    replacment: "Brembo",
    category: "Braking System",
    thumbnail: "https://via.placeholder.com/400x400?text=Brake+Pads"
  },
  {
    id: 3,
    name: "Spark Plug Platinum",
    description: "Long-lasting platinum spark plugs for better fuel efficiency.",
    rating: 4.5,
    qty: 200,
    replacment: "NGK",
    category: "Ignition",
    thumbnail: "https://via.placeholder.com/400x400?text=Spark+Plug"
  }
];

const PartsInquiry: React.FC = () => {
  // --- States ---
  const [searchId, setSearchId] = useState<string>(''); // لإدخال الـ ID
  const [product, setProduct] = useState<Part | null>(null); // المنتج الذي تم العثور عليه
  const [error, setError] = useState<string>(''); // رسالة الخطأ

  // --- Search Logic ---
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // البحث في البيانات التجريبية عن الـ ID
    const found = DUMMY_PARTS.find(item => item.id === Number(searchId));

    if (found) {
      setProduct(found);
    } else {
      setProduct(null);
      setError('Part not found. Please try ID: 1, 2, or 3.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      
      {/* 1. Header & Search Section */}
      <div className="w-full max-w-md mb-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Parts Inquiry</h1>
        
        <form onSubmit={handleSearch} className="relative">
          <label htmlFor="search" className="sr-only">Search by ID</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="number"
              id="search"
              value={searchId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchId(e.target.value)}
              className="block w-full p-4 ps-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
              placeholder="Enter Part ID"
              required
            />
            <button 
              type="submit" 
              className="absolute end-2 bottom-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors"
            >
              Find Part
            </button>
          </div>
        </form>
        
        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
      </div>

      {/* 2. Product Card Section (Only appears when product is found) */}
      {product ? (
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Image */}
            <div className="md:w-1/2 bg-gray-100 flex justify-center items-center p-12">
              <img 
                src={product.thumbnail} 
                alt={product.name} 
                className="max-h-87.5 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right: Details */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs mb-3">
                {product.category}
              </span>

              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                 
                 
                 <span className="text-yellow-500 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full flex items-center gap-1">
                   ★ {product.rating}
                 </span>
              </div>

              <p className="text-gray-500 leading-relaxed mb-8 text-lg italic">
                "{product.description}"
              </p>

              <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="border-l-4 border-cyan-500 pl-4 py-2">
                      <span className="block text-gray-400 font-medium mb-1">replacment</span> 
                      <span className="text-gray-900 font-bold">{product.replacment}</span>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                      <span className="block text-gray-400 font-medium mb-1">Availability</span> 
                      <span className="text-gray-900 font-bold">{product.qty} In Stock</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Welcome Message (Before searching)
        !error && (
          <div className="text-center text-gray-400 mt-20 opacity-60">
            <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-xl">Search for a part ID to see details</p>
          </div>
        )
      )}
    </div>
  );
};

export default PartsInquiry;