import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getAllOrders } from '../services/orderService';
import { images } from '../../config/imgConfig';

const Dashboard = () => {
  const [queueNumber, setQueueNumber] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const notificationSound = new Audio(images.bell); // Adjust the path as necessary

  useEffect(() => {
    const socket = io('http://bigbew-service.vercel.app');

    const fetchInitialOrders = async () => {
      try {
        const orders = await getAllOrders();
        const pendingOrders = orders.filter(order => order.status === 'Pending');
        if (pendingOrders.length > 0) {
          setQueueNumber(pendingOrders[0].orderNumber);
        } else {
          setQueueNumber(null);
        }
      } catch (error) {
        console.error('Error fetching initial orders:', error);
      }
    };

    fetchInitialOrders();

    // Listen for new order events
    socket.on('newOrder', (order) => {
      console.log('New order received:', order);
      setQueueNumber(order.orderNumber);
      // Play sound when a new order is received
      try {
        notificationSound.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    });

    // Listen for connection status
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server:', socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server:', socket.id);
    });

    // Check for connection error
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    return () => {
      socket.disconnect(); // Clean up on component unmount
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
