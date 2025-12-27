import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;      // Added SKU
  stock: number;
  location: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/parts')
      .then((res) => res.json())
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Loading inventory...</div>;

  return (
  <div>
    <h1 className='text-center text-6xl m-10 text-amber-600 '>Products</h1>
     <div className="flex items-center gap-3">
     
     </div>

    <div className="relative overflow-x-auto ">
      
      <table className=" border-gray-50 shadow-2xl border-2 rounded-4xl w-full text-sm text-left rtl:text-right text-body ">
        <thead className="text-sm text-body bg-neutral-secondary-medium">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-base font-medium">
              Part name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              SKU
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Stock Quantity
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
              Location
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-neutral-primary border-b border-neutral-secondary-soft last:border-0">
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {product.name}
              </th>
              <td className="px-6 py-4 font-mono text-xs text-gray-500">
                {product.sku}
              </td>
              <td className="px-6 py-4">
                {product.stock}
              </td>
              <td className="px-6 py-4">
                {product.location}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => console.log("Edit clicked", product.id)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button 
                    onClick={() => console.log("Delete clicked", product.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
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