import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderNumber = ({ orderNumber }) => { // Receive orderNumber as a prop
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsVisible(false);
          navigate(0); // Reload the page using navigate
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  if (!isVisible) {
    return null; // Render nothing if the card is not visible
  }

  return (
    <div className="flex items-center justify-center p-4 md:p-6">
      <div className="bg-white shadow-lg rounded-lg border border-gray-300 transition-transform transform hover:scale-105 max-w-md w-full">
        <div className="flex flex-col items-center p-6">
          <span className="text-lg font-semibold text-gray-800">Your Order Number:</span>
          <span className="mt-2 text-5xl md:text-6xl font-bold text-yellow-900">{orderNumber}</span>
          <span className="text-sm text-gray-500 mt-1">Status: Pending</span>
          <span className="text-xs text-red-500 mt-4">* Take a screenshot before it disappears *</span>
          <span className="text-lg text-gray-600 mt-2">{countdown > 0 ? `Disappears in: ${countdown}s` : "Order number has disappeared!"}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderNumber;
