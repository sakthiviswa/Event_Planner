import React, { useState, useMemo } from 'react';
import { Search, Plus, MoreHorizontal, Ticket, Trash2, Edit, Package } from 'lucide-react';

// Ticket type
type TicketType = {
  id: string | number;
  title: string;
  description?: string;
  status: string;
  price: string | number;
  quantitySold: number;
  quantityAvailable?: number;
  category?: string;
};

// Create Product Component
interface CreateProductProps {
  onBack: () => void;
  onProductCreated: (product: TicketType) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onBack, onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productCategory: 'Tickets',
    price: '',
    quantityAvailable: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!formData.name || !formData.price || !formData.quantityAvailable) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new product object
    const newProduct: TicketType = {
      id: Date.now(),
      title: formData.name,
      status: 'ON SALE',
      price: `$${parseFloat(formData.price).toFixed(2)}`,
      quantitySold: 0,
      description: formData.description,
      category: formData.productCategory,
      quantityAvailable: parseInt(formData.quantityAvailable)
    };

    console.log('Product created:', newProduct);

    // Call the callback to add product to the list
    onProductCreated(newProduct);

    // Reset form
    setFormData({
      name: '',
      description: '',
      productCategory: 'Tickets',
      price: '',
      quantityAvailable: ''
    });

    alert('Product created successfully!');

    // Go back to tickets page
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-teal-500/20 rounded-lg transition-colors text-teal-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-white">Create Product</h1>
        </div>

        <div className="space-y-6">
          {/* Product Type Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-teal-500/30">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-teal-500/20 p-2 rounded-lg border border-teal-500/30">
                <Ticket className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ticket</h3>
                <p className="text-sm text-slate-300">This product is a ticket. Buyers will be issued a ticket upon purchase</p>
              </div>
            </div>
          </div>

          {/* Price Type Section */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-3">Price Type</h3>
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-teal-500/30 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="bg-teal-500 p-2 rounded-lg">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Paid Product</h4>
                  <p className="text-sm text-slate-300">Standard product with a fixed price</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-white placeholder-slate-400"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none shadow-sm text-white placeholder-slate-400"
                placeholder="Enter product description"
              />
            </div>

            {/* Product Category Field */}
            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-slate-300 mb-1">
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-white"
              >
                <option value="Tickets" className="bg-slate-800">Tickets</option>
                <option value="Merchandise" className="bg-slate-800">Merchandise</option>
                <option value="Digital" className="bg-slate-800">Digital</option>
                <option value="Food & Beverage" className="bg-slate-800">Food & Beverage</option>
              </select>
            </div>

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-white placeholder-slate-400"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label htmlFor="quantityAvailable" className="block text-sm font-medium text-slate-300 mb-1">
                  Quantity Available *
                </label>
                <input
                  type="number"
                  id="quantityAvailable"
                  name="quantityAvailable"
                  value={formData.quantityAvailable}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-white placeholder-slate-400"
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-slate-700/50 backdrop-blur-sm text-slate-300 py-3 px-4 rounded-lg hover:bg-slate-600/50 transition-all duration-200 font-medium text-lg shadow-md border border-slate-600/30"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-400 transition-all duration-200 font-medium text-lg shadow-lg"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;