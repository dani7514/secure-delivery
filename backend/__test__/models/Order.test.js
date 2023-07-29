require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const { foodSchema } = require('../../models/Food');
const { orderModel } = require('../../models/Order');
const orderStatus = require('../../shared/enums/orderStatus');

describe('Order Model', () => {
  let order;

  beforeAll(() => {
    const url = process.env.MONGO_TEST_URI;
    return mongoose.connect(url);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    order = new orderModel({
      name: 'John Doe',
      address: '123 Main St',
      addressLatLng: { lat: '123', lng: '456' },
      totalPrice: 100,
      items: [
        {
          food: {
            name: 'Food 1',
            price: 10,
            tags: ['tag1', 'tag2'],
            favorite: true,
            imageUrl: 'https://example.com/food1.jpg',
            star: 4.5,
            origins: ['origin1', 'origin2'],
            cookTime: '30 minutes',
          },
          price: 10,
          quantity: 2,
        },
      ],
      status: orderStatus.NEW,
      user: mongoose.Types.ObjectId(),
      checkout_id: 'checkout_123',
    });
  });

  afterEach(async () => {
    await orderModel.deleteMany();
  });

  test('should save an order document correctly', async () => {
    const savedOrder = await order.save();

    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.name).toBe(order.name);
    expect(savedOrder.address).toBe(order.address);
    expect(savedOrder.addressLatLng.lat).toBe(order.addressLatLng.lat);
    expect(savedOrder.addressLatLng.lng).toBe(order.addressLatLng.lng);
    expect(savedOrder.paymentId).toBe(order.paymentId);
    expect(savedOrder.totalPrice).toBe(order.totalPrice);
    expect(savedOrder.items.length).toBe(order.items.length);
    expect(savedOrder.items[0].food.name).toBe(order.items[0].food.name);
    expect(savedOrder.status).toBe(order.status);
    expect(savedOrder.user.toString()).toBe(order.user.toString());
    expect(savedOrder.checkout_id).toBe(order.checkout_id);
    expect(savedOrder.createdAt).toBeDefined();
    expect(savedOrder.updatedAt).toBeDefined();
  });

  test('should require the name field', async () => {
    delete order.name;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the address field', async () => {
    delete order.address;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the addressLatLng field', async () => {
    delete order.addressLatLng;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the totalPrice field', async () => {
    delete order.totalPrice;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the items field', async () => {
    delete order.items;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the user field', async () => {
    delete order.user;

    let error;
    try {
      await order.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });
});
