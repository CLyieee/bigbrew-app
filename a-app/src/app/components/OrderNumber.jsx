import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const OrderNumber = ({ orderNumber }) => { // Receive orderNumber as a prop
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('Pending'); // Initialize order status

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // Make an API call to fetch the order status from the database
        const response = await axios.get(`/api/orders/${orderNumber}`); // Adjust the endpoint as necessary
        if (response.data && response.data.status) {
          setOrderStatus(response.data.status); // Update the order status
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchOrderStatus();
  }, [orderNumber]);

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
