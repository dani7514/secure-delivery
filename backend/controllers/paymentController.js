const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const orderStatus = require('../shared/enums/orderStatus');
const orderModel = require('../models/Order');
const paymentService = require('../services/paymentService');

exports.postPayment = async (req, res, next) => {
  try {
    const session = await paymentService.createCheckoutSession(req.body.items);
    const order = await orderModel.findOne({items: req.body.items, status: orderStatus.NEW});
    if (order) {
      order.checkout_id = session.id;
      await order.save();
    }
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

exports.checkPaymentStatus = async (req, res) => {
  try {
    const c_id = req.body.id;
    const session = await paymentService.retrieveCheckoutSession(c_id);
    let paymentIntent = '';
    if (session.payment_intent) {
      paymentIntent = await paymentService.retrievePaymentIntent(session.payment_intent);
      paymentIntent = paymentIntent.status;
    } else {
      paymentIntent = 'payment_failed';
    }
    const order = await orderModel.findOne({checkout_id: c_id});
    if (order) {
      order.status = paymentIntent;
      await order.save();
    }
    res.status(200).json(paymentIntent);
  } catch (error) {
    console.log(error);
  }
};
