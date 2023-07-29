const orderModel = require('../models/Order');
const orderStatus = require('../shared/enums/orderStatus');

exports.deleteNewOrderByUser = async (userId) => {
  await orderModel.deleteOne({
    user: userId,
    status: orderStatus.NEW
  });
};

exports.createOrder = async (orderData, userId) => {
  const newOrder = new orderModel({...orderData, user: userId});
  await newOrder.save();
  return newOrder;
};

exports.getOrdersByUser = async (userId) => {
  return await orderModel.find({user: userId});
};

exports.getNewOrderByUser = async (userId) => {
  return await orderModel.findOne({user: userId, status: orderStatus.NEW});
};

exports.getOrderStatusPaid = () => {
  return orderStatus.PAYED;
};
