import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  sku: string;      
  stock: number;
  location: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // State to track which row is being edited
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  useEffect(() => {
    fetch('http://localhost:8000/api/parts')
      .then((res) => res.json())
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- Start Edit Mode ---
  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setTempStock(product.stock);
  };

  const handleSave = async (id: number) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/parts/${id}`, {
        stock: tempStock
      });

      if (response.status === 200) {
        setProducts(products.map(p => p.id === id ? { ...p, stock: tempStock } : p));
        setEditingId(null);
      }
    } catch (error) {
      alert("Error updating stock quantity.");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this part?")) {
      await axios.delete(`http://localhost:8000/api/parts/${id}`);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (loading) return <div className="text-center p-10 font-bold text-amber-600 text-xl">Loading Inventory...</div>;

  return (
    <div>
      <h1 className='text-center text-6xl m-10 text-amber-600 font-bold'>Parts</h1>

      <div className="relative overflow-x-auto">
        <table className="border-gray-50 shadow-2xl border-2 rounded-4xl w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-base font-medium">Part name</th>
              <th scope="col" className="px-6 py-3 font-medium">SKU</th>
              <th scope="col" className="px-6 py-3 font-medium text-center">Stock Quantity</th>
              <th scope="col" className="px-6 py-3 font-medium">Location</th>
              <th scope="col" className="px-6 py-3 rounded-e-base font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-neutral-primary border-b border-neutral-secondary-soft last:border-0 hover:bg-amber-50/30 transition-colors">
                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                  {product.name}
                </th>
                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                  {product.sku}
                </td>
                
                {/* Stock Quantity Cell (Editable) */}
                <td className="px-6 py-4 text-center">
                  {editingId === product.id ? (
                    <input 
                      type="number"
                      autoFocus
                      className="w-20 border-2 border-amber-400 rounded-lg px-2 py-1 text-center outline-none focus:ring-2 focus:ring-amber-200"
                      value={tempStock}
                      onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                    />
                  ) : (
                    <span className={`font-bold ${product.stock < 5 ? 'text-red-600' : 'text-gray-700'}`}>
                      {product.stock}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {product.location}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {editingId === product.id ? (
                      <>
                        <button 
                          onClick={() => handleSave(product.id)}
                          className="text-green-600 hover:text-green-800 transition-transform active:scale-90"
                          title="Save Changes"
                        >
                          <Check size={22} />
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Cancel"
                        >
                          <X size={22} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => startEdit(product)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit Stock"
                        >
                          <Pencil size={18} />
                        </button>

                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;