const stripe = require('stripe');
const paymentService = require('../../services/paymentService');

jest.mock('stripe');

describe('paymentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCheckoutSession', () => {
    test('should create a checkout session with the provided items', async () => {
      const mockItems = [
        { food: { name: 'Food 1', price: 10 }, quantity: 2 },
        { food: { name: 'Food 2', price: 15 }, quantity: 1 },
      ];

      const mockSessionResponse = { id: 'session_id' };
      stripe.checkout.sessions.create.mockResolvedValue(mockSessionResponse);

      const session = await paymentService.createCheckoutSession(mockItems);

      expect(stripe.checkout.sessions.create).toHaveBeenCalledTimes(1);
      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'INR',
              product_data: { name: 'Food 1', images: [] },
              unit_amount: 1000,
            },
            quantity: 2,
          },
          {
            price_data: {
              currency: 'INR',
              product_data: { name: 'Food 2', images: [] },
              unit_amount: 1500,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://gorana-food-house.vercel.app/payment-success',
        cancel_url: 'https://gorana-food-house.vercel.app/payment-failed',
      });

      expect(session).toEqual(mockSessionResponse);
    });
  });

  describe('retrieveCheckoutSession', () => {
    test('should retrieve the checkout session with the provided session ID', async () => {
      const sessionId = 'session_id';

      const mockSessionResponse = { id: 'session_id' };
      stripe.checkout.sessions.retrieve.mockResolvedValue(mockSessionResponse);

      const session = await paymentService.retrieveCheckoutSession(sessionId);

      expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledTimes(1);
      expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith('session_id');
      expect(session).toEqual(mockSessionResponse);
    });
  });

  describe('retrievePaymentIntent', () => {
    test('should retrieve the payment intent with the provided payment intent ID', async () => {
      const paymentIntentId = 'payment_intent_id';

      const mockPaymentIntentResponse = { id: 'payment_intent_id' };
      stripe.paymentIntents.retrieve.mockResolvedValue(mockPaymentIntentResponse);

      const paymentIntent = await paymentService.retrievePaymentIntent(paymentIntentId);

      expect(stripe.paymentIntents.retrieve).toHaveBeenCalledTimes(1);
      expect(stripe.paymentIntents.retrieve).toHaveBeenCalledWith('payment_intent_id');
      expect(paymentIntent).toEqual(mockPaymentIntentResponse);
    });
  });
});
