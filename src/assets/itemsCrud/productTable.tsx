import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
}

const ProductTable: React.FC = () => {
  // 2. مصفوفة البيانات (يمكنك جلبها لاحقاً من API)
  const products: Product[] = [
    { id: 1, name: 'Apple MacBook Pro 17"', qty: 1, price: 2999 },
    { id: 2, name: 'Microsoft Surface Pro', qty: 1, price: 1999 },
    { id: 3, name: 'Magic Mouse 2', qty: 1, price: 99 },
  ];


  return (
  <div>
    <h1 className='text-center text-6xl m-10'>Products</h1>
     <div className="flex items-center gap-3">
     
     </div>

    <div className="relative overflow-x-auto bg-slate-50 border-black/5">
      
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-base font-medium">
              Part name
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              SKu
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
              Qty
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
              Stock Status
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
              <td className="px-6 py-4">
                {product.qty}
              </td>
              <td className="px-6 py-4">
                ${product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                ${product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    {/* Edit Button */}
    <button 
      onClick={() => console.log("Edit clicked")}
      className="text-blue-600 hover:text-blue-900 transition-colors"
      title="Edit"
    >
      <Pencil size={18} />
    </button>

    {/* Delete Button */}
    <button 
      onClick={() => console.log("Delete clicked")}
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