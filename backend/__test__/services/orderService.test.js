const orderService = require('../../services/orderService');
const orderModel = require('../../models/Order');
const orderStatus = require('../../shared/enums/orderStatus');

jest.mock('../../models/Order');

describe('orderService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteNewOrderByUser', () => {
    test('should delete a new order by user ID', async () => {
      const userId = '123';
      orderModel.deleteOne.mockResolvedValue();

      await orderService.deleteNewOrderByUser(userId);

      expect(orderModel.deleteOne).toHaveBeenCalledWith({
        user: userId,
        status: orderStatus.NEW,
      });
    });
  });

  describe('createOrder', () => {
    test('should create and return a new order', async () => {
      const orderData = { item: 'Item 1' };
      const userId = '123';
      const newOrder = { _id: '456', ...orderData, user: userId };
      const saveMock = jest.fn().mockResolvedValue(newOrder);
      orderModel.mockReturnValueOnce({ save: saveMock });

      const result = await orderService.createOrder(orderData, userId);

      expect(orderModel).toHaveBeenCalledWith({ ...orderData, user: userId });
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(newOrder);
    });
  });

  describe('getOrdersByUser', () => {
    test('should return an array of orders by user ID', async () => {
      const userId = '123';
      const orders = [{ item: 'Item 1' }, { item: 'Item 2' }];
      orderModel.find.mockResolvedValue(orders);

      const result = await orderService.getOrdersByUser(userId);

      expect(orderModel.find).toHaveBeenCalledWith({ user: userId });
      expect(result).toEqual(orders);
    });
  });

  describe('getNewOrderByUser', () => {
    test('should return a new order by user ID', async () => {
      const userId = '123';
      const order = { item: 'Item 1', status: orderStatus.NEW };
      orderModel.findOne.mockResolvedValue(order);

      const result = await orderService.getNewOrderByUser(userId);

      expect(orderModel.findOne).toHaveBeenCalledWith({
        user: userId,
        status: orderStatus.NEW,
      });
      expect(result).toEqual(order);
    });
  });

  describe('getOrderStatusPaid', () => {
    test('should return the order status "Paid"', () => {
      const result = orderService.getOrderStatusPaid();

      expect(result).toBe(orderStatus.PAYED);
    });
  });
});
