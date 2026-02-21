import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onSubmit = async (data: any) => {
    const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    setIsModalOpen(false);
    setEditingProduct(null);
    reset();
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setValue('name', product.name);
    setValue('category', product.category);
    setValue('price', product.price);
    setValue('discount', product.discount);
    setValue('stock', product.stock);
    setValue('image', product.image);
    setValue('description', product.description);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    reset();
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <button 
          onClick={openAdd}
          className="bg-secondary hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={product.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                  <span className="font-medium text-gray-900">{product.name}</span>
                </td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 text-gray-900 font-medium">₹{product.price}</td>
                <td className="p-4 text-gray-600">{product.stock}</td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input {...register('name')} className="w-full border rounded-lg p-2" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select {...register('category')} className="w-full border rounded-lg p-2">
                    <option>Mobile Chargers</option>
                    <option>USB Cables</option>
                    <option>Power Banks</option>
                    <option>Hair Sprays</option>
                    <option>Home Essentials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input type="number" {...register('stock')} className="w-full border rounded-lg p-2" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input type="number" step="0.01" {...register('price')} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount (%)</label>
                  <input type="number" {...register('discount')} className="w-full border rounded-lg p-2" defaultValue={0} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input {...register('image')} className="w-full border rounded-lg p-2" placeholder="https://..." required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea {...register('description')} className="w-full border rounded-lg p-2" rows={3}></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
