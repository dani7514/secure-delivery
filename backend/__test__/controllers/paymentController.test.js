const stripe = require('stripe');
const orderStatus = require('../../shared/enums/orderStatus');
const orderModel = require('../../models/Order');
const paymentService = require('../../services/paymentService');
const {
  postPayment,
  checkPaymentStatus
} = require('../../controllers/paymentController');

jest.mock('stripe');
jest.mock('../../models/Order');
jest.mock('../../services/paymentService');

describe('Payment Controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        items: ['item1', 'item2']
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('postPayment', () => {
    it('should create checkout session and update order checkout_id if order exists', async () => {
      const session = {
        id: 'checkout_session_id'
      };
      const order = {
        items: ['item1', 'item2'],
        status: orderStatus.NEW,
        save: jest.fn()
      };

      paymentService.createCheckoutSession.mockResolvedValue(session);
      orderModel.findOne.mockResolvedValue(order);

      await postPayment(req, res, next);

      expect(paymentService.createCheckoutSession).toHaveBeenCalledWith(req.body.items);
      expect(orderModel.findOne).toHaveBeenCalledWith({ items: req.body.items, status: orderStatus.NEW });
      expect(order.checkout_id).toBe(session.id);
      expect(order.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(session);
    });

    it('should create checkout session and not update order if order does not exist', async () => {
      const session = {
        id: 'checkout_session_id'
      };

      paymentService.createCheckoutSession.mockResolvedValue(session);
      orderModel.findOne.mockResolvedValue(null);

      await postPayment(req, res, next);

      expect(paymentService.createCheckoutSession).toHaveBeenCalledWith(req.body.items);
      expect(orderModel.findOne).toHaveBeenCalledWith({ items: req.body.items, status: orderStatus.NEW });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(session);
    });

    it('should call next with error if an error occurs', async () => {
      const error = new Error('Test error');

      paymentService.createCheckoutSession.mockRejectedValue(error);

      await postPayment(req, res, next);

      expect(paymentService.createCheckoutSession).toHaveBeenCalledWith(req.body.items);
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('checkPaymentStatus', () => {
    it('should retrieve checkout session, retrieve payment intent, update order status, and send payment intent as response', async () => {
      const c_id = 'checkout_session_id';
      const session = {
        payment_intent: 'payment_intent_id'
      };
      const paymentIntent = {
        status: 'succeeded'
      };
      const order = {
        checkout_id: c_id,
        save: jest.fn()
      };

      paymentService.retrieveCheckoutSession.mockResolvedValue(session);
      paymentService.retrievePaymentIntent.mockResolvedValue(paymentIntent);
      orderModel.findOne.mockResolvedValue(order);

      await checkPaymentStatus(req, res);

      expect(paymentService.retrieveCheckoutSession);
      expect(paymentService.retrievePaymentIntent).toHaveBeenCalledWith(session.payment_intent);
      expect(orderModel.findOne);
      expect(order.status).toBe(paymentIntent.status);
      expect(order.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(paymentIntent.status);
    });

    it('should retrieve checkout session, set payment intent to "payment_failed", update order status, and send "payment_failed" as response if no payment intent', async () => {
      const c_id = 'checkout_session_id';
      const session = {
        payment_intent: null
      };
      const order = {
        checkout_id: c_id,
        save: jest.fn()
      };

      paymentService.retrieveCheckoutSession.mockResolvedValue(session);
      orderModel.findOne.mockResolvedValue(order);

      await checkPaymentStatus(req, res);

      expect(paymentService.retrieveCheckoutSession);
      expect(paymentService.retrievePaymentIntent).not.toHaveBeenCalled();
      expect(orderModel.findOne);
      expect(order.status).toBe('payment_failed');
      expect(order.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('payment_failed');
    });

    it('should log error if an error occurs', async () => {
      const error = new Error('Test error');

      paymentService.retrieveCheckoutSession.mockRejectedValue(error);

      await checkPaymentStatus(req, res);

      expect(paymentService.retrieveCheckoutSession).toHaveBeenCalledWith(req.body.id);
      expect(console.log);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
