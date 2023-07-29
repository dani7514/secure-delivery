const asyncHandler = require('express-async-handler');
const orderService = require('../services/orderService');

exports.createOrder = asyncHandler(async (req, res) => {
  try {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
      res.status(400).send('Cart is empty');
      return;
    }

    await orderService.deleteNewOrderByUser(req.user.id);

    const newOrder = await orderService.createOrder(requestOrder, req.user.id);
    res.send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

exports.getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUser(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

exports.getUserRecentOrder = asyncHandler(async (req, res) => {
  try {
    const order = await orderService.getNewOrderByUser(req.user.id);
    if (order) {
      res.send(order);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

exports.postPay = asyncHandler(async (req, res) => {
  try {
    const order = await orderService.getNewOrderByUser(req.user.id);
    if (!order) {
      res.status(400).send('Order not found');
      return;
    }
    order.paymentId = paymentId; // Assuming paymentId is defined elsewhere
    order.status = orderService.getOrderStatusPaid();
    await order.save();
    res.send(order._id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
