require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const { userModel } = require('../../models/User');

describe('User Model', () => {
  let user;

  beforeAll(() => {
    const url = process.env.MONGO_TEST_URI;
    return mongoose.connect(url);
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    user = new userModel({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      mobile: 1234567890,
      houseNumber: '123',
      streetArea: 'Main St',
      city: 'City',
      state: 'State',
      pincode: 123456,
      isAdmin: false,
      cart: {},
      otp: 1234,
    });
  });

  afterEach(async () => {
    await userModel.deleteMany();
  });

  test('should save a user document correctly', async () => {
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(user.firstName);
    expect(savedUser.lastName).toBe(user.lastName);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password).toBe(user.password);
    expect(savedUser.mobile).toBe(user.mobile);
    expect(savedUser.houseNumber).toBe(user.houseNumber);
    expect(savedUser.streetArea).toBe(user.streetArea);
    expect(savedUser.city).toBe(user.city);
    expect(savedUser.state).toBe(user.state);
    expect(savedUser.pincode).toBe(user.pincode);
    expect(savedUser.isAdmin).toBe(user.isAdmin);
    expect(savedUser.cart).toEqual(user.cart);
    expect(savedUser.otp).toBe(user.otp);
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });

  test('should require the firstName field', async () => {
    delete user.firstName;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the lastName field', async () => {
    delete user.lastName;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the email field', async () => {
    delete user.email;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require a valid email address', async () => {
    user.email = 'invalidemail';

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the password field', async () => {
    delete user.password;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the mobile field', async () => {
    delete user.mobile;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the houseNumber field', async () => {
    delete user.houseNumber;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the streetArea field', async () => {
    delete user.streetArea;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the city field', async () => {
    delete user.city;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the state field', async () => {
    delete user.state;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the pincode field', async () => {
    delete user.pincode;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });

  test('should require the isAdmin field', async () => {
    delete user.isAdmin;

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error);
  });
});
