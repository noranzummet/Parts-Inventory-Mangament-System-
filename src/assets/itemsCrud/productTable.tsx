import React from 'react';

interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
  color: string;
  category: string;
}

const ProductTable: React.FC = () => {
  // 2. البيانات (يمكنك جلبها من API لاحقاً)
  const products: Product[] = [
    { id: 1, name: 'Apple MacBook Pro 17"', qty: 1, price: 2999, color: 'Silver', category: 'Laptop' },
    { id: 2, name: 'Microsoft Surface Pro', qty: 1, price: 1999, color: 'White', category: 'Laptop PC' },
    { id: 3, name: 'Magic Mouse 2', qty: 1, price: 99, color: 'Black', category: 'Accessories' },
  ];

  // 3. حساب المجموع الكلي (اختياري للـ Footer)
  const totalQty = products.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = products.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        {/* رأس الجدول */}
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">Product name</th>
            <th scope="col" className="px-6 py-3 font-medium">Color</th>
            <th scope="col" className="px-6 py-3 font-medium">Category</th>
            <th scope="col" className="px-6 py-3 font-medium">Qty</th>
            <th scope="col" className="px-6 py-3 font-medium">Price</th>
            <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>

        {/* جسم الجدول */}
        <tbody>
          {products.map((product) => (
            <tr 
              key={product.id} 
              className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium transition-colors"
            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {product.name}
              </th>
              <td className="px-6 py-4">{product.color}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.qty}</td>
              <td className="px-6 py-4">${product.price.toLocaleString()}</td>
              <td className="px-6 py-4 text-right space-x-3 rtl:space-x-reverse">
                <button 
                  onClick={() => console.log('Edit', product.id)}
                  className="font-medium text-fg-brand hover:underline"
                >
                  Edit
                </button>
                <button 
                  onClick={() => console.log('Delete', product.id)}
                  className="font-medium text-fg-danger hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        {/* تذييل الجدول (المجاميع) */}
        <tfoot>
          <tr className="font-semibold text-heading bg-neutral-secondary-soft/50">
            <th scope="row" colSpan={3} className="px-6 py-3 text-base">Total</th>
            <td className="px-6 py-3">{totalQty}</td>
            <td className="px-6 py-3" colSpan={2}>${totalPrice.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductTable;