'use client';
import React, { useState } from 'react';
import { Ticket, Package } from 'lucide-react';

export default function CreateProductPage() {
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
    console.log('Product created:', formData);
    // Handle form submission here
    alert('Product created successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-500 mb-8">Create Product</h1>

        <div className="space-y-6">
          {/* Product Type Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-pink-100 p-2 rounded">
                <Ticket className="w-4 h-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ticket</h3>
                <p className="text-sm text-gray-600">This product is a ticket. Buyers will be issued a ticket upon purchase</p>
              </div>
            </div>
          </div>

          {/* Price Type Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Price Type</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="bg-gray-900 p-2 rounded">
                  <Package className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Paid Product</h4>
                  <p className="text-sm text-gray-600">Standard product with a fixed price</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Product Category Field */}
            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Tickets">Tickets</option>
                <option value="Merchandise">Merchandise</option>
                <option value="Digital">Digital</option>
                <option value="Food & Beverage">Food & Beverage</option>
              </select>
            </div>

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Available
                </label>
                <input
                  type="number"
                  id="quantityAvailable"
                  name="quantityAvailable"
                  value={formData.quantityAvailable}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium text-lg"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
