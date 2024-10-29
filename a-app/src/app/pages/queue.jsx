import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js'; // Import Pusher
import { getAllOrders } from '../services/orderService';
import { images } from '../../config/imgConfig';

const Dashboard = () => {
  const [queueNumber, setQueueNumber] = useState(null); // Hold only the current order number
  const [isConnected, setIsConnected] = useState(false);
  const notificationSound = new Audio(images.bell); // Adjust the path as necessary

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher('a8f6e6479ccbf226115c', { // Use your Pusher key
      cluster: 'ap1', // Use your Pusher cluster
      encrypted: true,
    });

    // Subscribe to the orders channel
    const channel = pusher.subscribe('orders');
    channel.bind('new-order', (data) => {
      console.log('New order received:', data);
      setQueueNumber(data.orderData.orderNumber); // Update to the latest order number
      // Play sound when a new order is received
      try {
        notificationSound.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    });

    // Fetch initial orders
    const fetchInitialOrders = async () => {
      try {
        const orders = await getAllOrders();
        const pendingOrders = orders.filter(order => order.status === 'Pending');
        if (pendingOrders.length > 0) {
          setQueueNumber(pendingOrders[0].orderNumber); // Show the first pending order if any
        } else {
          setQueueNumber(null);
        }
      } catch (error) {
        console.error('Error fetching initial orders:', error);
      }
    };

    fetchInitialOrders();

    // Update connection status
    setIsConnected(true);
    console.log('Connected to Pusher');

    return () => {
      pusher.disconnect(); // Clean up on component unmount
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg p-6 text-center flex flex-col justify-between w-full max-w-md mx-auto shadow-lg">
        <h2 className="text-white font-bold mb-4 bg-blue-600 p-2 rounded-t-lg">NEW ORDER</h2>
        <div className="flex justify-center items-center flex-1">
          {queueNumber ? (
            <span className="text-yellow-400 text-6xl font-bold">{queueNumber}</span>
          ) : (
            <div className="flex justify-center items-center gap-1">
              <div className="bg-yellow-600 w-10 h-4 rounded"></div>
              <div className="bg-yellow-600 w-10 h-4 rounded"></div>
              <div className="bg-yellow-600 w-10 h-4 rounded"></div>
              <div className="bg-yellow-600 w-10 h-4 rounded"></div>
            </div>
          )}
        </div>
        <div className={`mt-4 text-white ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
