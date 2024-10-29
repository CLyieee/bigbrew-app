import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderByNumber } from '../services/orderService'; // Import the service method

const OrderNumber = ({ orderNumber }) => { // Receive orderNumber as a prop
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('Pending'); // Initialize order status
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const orderData = await getOrderByNumber(orderNumber); // Use the service method
        if (orderData && orderData.status) {
          setOrderStatus(orderData.status); // Update the order status
        } else {
          setError("Order not found.");
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchOrderStatus();
  }, [orderNumber]);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="flex items-center justify-center p-4 md:p-6">
      <div className="bg-white shadow-lg rounded-lg border border-gray-300 transition-transform transform hover:scale-105 max-w-md w-full">
        <div className="flex flex-col items-center p-6">
          <span className="text-lg font-semibold text-gray-800">Your Order Number:</span>
          <span className="mt-2 text-5xl md:text-6xl font-bold text-yellow-900">{orderNumber}</span>
          <span className="text-sm text-gray-500 mt-1">Status: {orderStatus}</span> {/* Display the dynamic status */}
          <span className="text-xs text-red-500 mt-4">* Take a screenshot before it disappears *</span>
        </div>
      </div>
    </div>
  );
};

export default OrderNumber;
