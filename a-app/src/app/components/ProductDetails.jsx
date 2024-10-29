import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ProductDetails = ({ product, onClose, onAddToOrder }) => {
  const [size, setSize] = useState('Medium');
  const [sugarLevel, setSugarLevel] = useState('50%');
  const [dineOption, setDineOption] = useState('Take Out');
  const [price, setPrice] = useState('29.00');
  const [quantity, setQuantity] = useState(1);

  // Update price based on selected size
  useEffect(() => {
    setPrice(size === 'Medium' ? '29.00' : '39.00');
  }, [size]);

  const handleOrder = () => {
    const orderDetails = {
      title: product.title,
      size,
      sugarLevel,
      dineOption,
      price,
      quantity,
    };

    onAddToOrder(orderDetails);
 
    onClose(); // Close the product details after adding to order
  };

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg max-h-[90vh] w-full max-w-sm relative overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-xl">✕</button>

        <div className="flex flex-col items-center text-center">
          <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-4 rounded-md" />
          <h2 className="text-xl font-bold mb-4">{product.title}</h2>
          <span className="text-gray-600 text-lg font-semibold mb-4">₱{price}</span>
          <span className="text-gray-600 text-sm mb-4">Category: {product.category}</span>

          {/* Size Selection */}
          <div className="mb-4 w-full">
            <h3 className="text-gray-700 text-sm">Size</h3>
            <div className="flex space-x-2 mt-2 justify-center">
              {['Medium', 'Large'].map(option => (
                <button
                  key={option}
                  className={`px-3 py-1 rounded-full ${size === option ? 'border-2 border-yellow-900 text-black' : 'bg-gray-200'}`}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Sugar Level Selection */}
          <div className="mb-4 w-full">
            <h3 className="text-gray-700 text-sm">Sugar Level</h3>
            <div className="flex space-x-2 mt-2 justify-center">
              {['25%', '50%', '75%', '100%'].map(level => (
                <button
                  key={level}
                  className={`px-3 py-1 rounded-full ${sugarLevel === level ? 'border-2 border-yellow-900' : 'bg-gray-200'}`}
                  onClick={() => setSugarLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Dine Option Selection */}
          <div className="mb-4 w-full">
            <h3 className="text-gray-700 text-sm">Dine In/Take Out</h3>
            <div className="flex space-x-2 mt-2 justify-center">
              {['Take Out', 'Dine In'].map(option => (
                <button
                  key={option}
                  className={`px-3 py-1 rounded-full ${dineOption === option ? 'border-2 border-yellow-900' : 'bg-gray-200'}`}
                  onClick={() => setDineOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6 w-full">
            <h3 className="text-gray-700 text-sm">Quantity</h3>
            <div className="flex items-center justify-center space-x-3 mt-2">
              <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 rounded-full text-lg">-</button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 rounded-full text-lg">+</button>
            </div>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleOrder}
            className="w-full border-2 border-yellow-900 text-yellow-900 py-2 rounded-lg font-semibold text-sm mt-4"
          >
            Add to order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
