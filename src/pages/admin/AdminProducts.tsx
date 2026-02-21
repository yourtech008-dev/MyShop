import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formatPrice } from '../../lib/utils';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredProducts(products.filter(p => 
      p.name.toLowerCase().includes(lowerTerm) || 
      p.category.toLowerCase().includes(lowerTerm)
    ));
  }, [searchTerm, products]);

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-500">Manage your store inventory</p>
        </div>
        <button 
          onClick={openAdd}
          className="bg-primary hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200 transition"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Product</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Category</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Price</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Stock</th>
                <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{formatPrice(product.price)}</div>
                    {product.discount > 0 && <div className="text-xs text-green-600">{product.discount}% Off</div>}
                  </td>
                  <td className="p-4">
                    <div className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-600'}`}>
                      {product.stock} Units
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input {...register('name')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select {...register('category')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Mobile Chargers</option>
                    <option>USB Cables</option>
                    <option>Power Banks</option>
                    <option>Hair Sprays</option>
                    <option>Home Essentials</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" {...register('stock')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" step="0.01" {...register('price')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input type="number" {...register('discount')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" defaultValue={0} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input {...register('image')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="https://..." required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea {...register('description')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" rows={3}></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-800 font-medium shadow-lg shadow-blue-200 transition">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
