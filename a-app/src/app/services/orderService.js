// services/orderService.js
import axios from "axios";

const BASE_URL = "https://bigbew-service.vercel.app"; // Adjust the port as necessary

const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/order/create`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response || error.message);
    throw new Error(`Error creating order: ${error.message}`);
  }
};


const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

const updateOrder = async (orderNumber, updateData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/orders/${orderNumber}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error updating order: ${error.message}`);
  }
};

export { createOrder, getAllOrders, updateOrder };
