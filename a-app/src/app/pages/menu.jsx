import React, { useState } from 'react';
import ProductCard from '../components/productCard';
import CategoryCard from '../components/category';
import ProductDetails from '../components/ProductDetails';
import OrderNumber from '../components/OrderNumber';
import producto from '../../config/milktea';
import toast from 'react-hot-toast';
import { createOrder } from '../services/orderService'; // Import the order service

const CountCircle = ({ count }) => (
  <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full text-xs">
    {count}
  </div>
);

const Menu = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const [addedItems, setAddedItems] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [pendingOrderNumbers, setPendingOrderNumbers] = useState([]); // Track pending order numbers

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'All' ? '' : category);
  };

  const filteredProducts = selectedCategory
    ? producto.filter((product) => product.category === selectedCategory)
    : producto;

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
  };

  const addToOrder = (item) => {
    const existingItem = addedItems.find((addedItem) => addedItem.title === item.title);

    if (existingItem) {
      setAddedItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.title === item.title
            ? { ...prevItem, quantity: prevItem.quantity + item.quantity } // add the selected quantity
            : prevItem
        )
      );
    } else {
      setAddedItems((prevItems) => [...prevItems, item]); // item already includes quantity
    }

    setOrderCount((prevCount) => prevCount + item.quantity); // increase by selected quantity
    toast.success(`${item.title} added to your order!`); // Single alert
  };

  const removeItem = (itemToRemove) => {
    setAddedItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
    setOrderCount((prevCount) => Math.max(prevCount - itemToRemove.quantity, 0)); // Adjust orderCount based on quantity
  };

  const totalPrice = addedItems.reduce((sum, item) =>
    sum + (parseFloat(item.price || 0) * item.quantity), 0
  ).toFixed(2);

  // Function to generate a unique order number
  const generateUniqueOrderNumber = () => {
    let newOrderNumber;
    do {
      newOrderNumber = Math.floor(Math.random() * 100) + 1;
    } while (pendingOrderNumbers.includes(newOrderNumber)); // Check if number is already pending
    return newOrderNumber;
  };

  const handleProceedOrder = () => {
    setShowOrderDetails(true);
  };

  const handleConfirmOrder = async () => {
    const newOrderNumber = generateUniqueOrderNumber(); // Get a unique order number
    setOrderNumber(newOrderNumber);

    // Add the new order number to the pending orders
    setPendingOrderNumbers((prev) => [...prev, newOrderNumber]);

    // Map through `addedItems` to create an array with item details
    const orderWithNumber = addedItems.map(item => ({
      title: item.title,
      size: item.size,
      sugarLvl: item.sugarLevel,
      quantity: item.quantity,
      price: item.price
    }));

    // Create the order object
    const orderData = {
      orderNumber: newOrderNumber,
      items: orderWithNumber,
      totalPrice: totalPrice,
      status: "Pending"
    };

    try {
      // Use the orderService to create the order
      await createOrder(orderData);
      toast.success('Order confirmed successfully!');
    } catch (error) {
      toast.error(`Failed to confirm order: ${error.message}`);
    }

    // Reset states
    setOrderCount(0);
    setAddedItems([]);
    closeOrderDetails();
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col relative">
      <div className="w-full bg-white flex items-center justify-center p-3 shadow-sm">
        <h1 className="text-xl font-bold text-orange-900">BIGBREW</h1>
      </div>

      <div className="flex justify-start space-x-2 p-2 bg-white overflow-x-auto">
        {['All', 'Milk Tea', 'Ice Coffee', 'Fruit Tea', 'Frap', 'Hotbrew'].map((category) => (
          <CategoryCard
            key={category}
            title={category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <div className="flex-grow bg-white p-2 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>
      </div>

      <div className="p-3 bg-white">
        <button
          className="relative w-full bg-orange-600 text-white py-2 rounded-lg font-semibold text-sm"
          onClick={handleProceedOrder}
        >
          <CountCircle count={orderCount} />
          PROCEED ORDER
        </button>
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={closeProductDetails}
          onAddToOrder={addToOrder} // Ensure this matches the function name
        />
      )}

      {showOrderDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm mx-4 relative">
            <h2 className="text-lg font-bold mb-4 text-center">Order Details</h2>

            {addedItems.length === 0 ? (
              <p className="text-gray-600 text-center">No items added to your order.</p>
            ) : (
              <ul className="space-y-2">
                {addedItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-sm text-gray-600">{`Size: ${item.size}`}</span>
                      <span className="text-sm text-gray-600">{`Sugar Level: ${item.sugarLevel}`}</span>
                      <span className="text-sm text-gray-600">{`Dine Option: ${item.dineOption}`}</span>
                      <span className="text-sm text-gray-600">{`Price: ₱${(parseFloat(item.price) * item.quantity).toFixed(2)}`}</span>
                      <span className="text-sm text-gray-600">{`Order Number: ${orderNumber}`}</span>

                      {/* Quantity controls */}
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-600 mr-2">Quantity:</span>
                        <span className="mx-2 text-sm font-semibold">{item.quantity}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item)}
                      className="text-red-500 ml-2"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 text-lg font-bold text-center">
              {`Total Price: ₱${totalPrice}`}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleConfirmOrder}
                className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mr-1"
              >
                Confirm
              </button>
              <button
                onClick={closeOrderDetails}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full ml-1"
              >
                Cancel
              </button>
            </div>

            <button
              onClick={closeOrderDetails}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {orderNumber && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-gray-900 bg-opacity-50">
          <OrderNumber orderNumber={orderNumber} />
        </div>
      )}
    </div>
  );
};

export default Menu;
