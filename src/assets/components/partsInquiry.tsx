import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';


interface Part {
  id: number;
  name: string;
  sku: string;       
  stock: number;      
  replacment: string; 
  category: string;
  location: string;
  thumbnail?: string; 
}

const PartsInquiry: React.FC = () => {
  const [searchId, setSearchId] = useState<string>(''); 
  const [product, setProduct] = useState<Part | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(''); 

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setProduct(null);
    setLoading(true);
    
    try {
      // Calling your specific detail route in Laravel
      const response = await axios.get(`http://localhost:8000/api/parts/${searchId}/details`);
      
      // Your Laravel Controller returns { status: 'available', data: { ... } }
      if (response.data.status === 'available') {
        setProduct(response.data.data);
      } else if (response.data.status === 'out_of_stock') {
        // If out of stock, show the replacement details from the API
        setError(response.data.message);
        setProduct({
            ...response.data.original_item,
            replacment: response.data.replacement_details.name,
            stock: 0,
            sku: 'N/A' // Or map as needed
        } as any);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.status === 404 ? 'Part ID not found in database.' : 'Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      
      {/* 1. Header & Search Section */}
      <div className="w-full max-w-md mb-12">
        <h1 className="text-3xl font-bold text-center text-amber-600 mb-6">Parts Inquiry</h1>
        
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="number"
              value={searchId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchId(e.target.value)}
              className="block w-full p-4 ps-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 shadow-sm"
              placeholder="Enter Part ID (e.g., 1)"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute end-2 bottom-2 bg-yellow-300 hover:bg-yellow-500 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors disabled:bg-gray-400"
            >
              {loading ? '...' : 'Find Part'}
            </button>
          </div>
        </form>
        
        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
      </div>

      {/* 2. Product Card Section */}
      {product && (
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform">
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Image Placeholder */}
            <div className="md:w-1/2 bg-gray-100 flex justify-center items-center p-12">
              <img 
                src={product.thumbnail || `https://via.placeholder.com/400x400?text=${product.name}`} 
                alt={product.name} 
                className="max-h-80 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right: Details */}
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-cyan-600 font-bold uppercase tracking-widest text-xs mb-3">
                {product.category || 'General Part'}
              </span>

              <h2 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h2>
              
              {/* SKU Display (Replaces Description) */}
              <p className="text-amber-600 font-mono text-sm mb-6">
                SKU: {product.sku}
              </p>

              <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="border-l-4 border-cyan-500 pl-4 py-2">
                      <span className="block text-gray-400 font-medium mb-1">Replacement</span> 
                      <span className="text-gray-900 font-bold">{product.replacment}</span>
                  </div>
                  <div className={`border-l-4 ${product.stock > 0 ? 'border-green-500' : 'border-red-500'} pl-4 py-2`}>
                      <span className="block text-gray-400 font-medium mb-1">Inventory</span> 
                      <span className="text-gray-900 font-bold">{product.stock} In Stock</span>
                  </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                 <span className="text-xs text-gray-400 uppercase font-bold">Storage Location</span>
                 <p className="text-gray-700 font-medium">{product.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {!product && !error && !loading && (
        <div className="text-center text-gray-400 mt-20 opacity-60">
          <p className="text-xl">Search for a part ID to see detailed specifications</p>
        </div>
      )}
    </div>
  );
};

export default PartsInquiry;