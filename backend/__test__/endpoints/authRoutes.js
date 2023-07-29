const axios = require('axios');

// Helper function to make API requests
async function makeRequest(method, url, data = {}, headers = {}) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

// Test Case: Seed Users
async function testSeedUsers() {
  try {
    const response = await makeRequest('GET', 'http://localhost:3000/users/seed');
    console.log('Test Case: Seed Users - Passed');
    console.log(response);
  } catch (error) {
    console.error('Test Case: Seed Users - Failed');
    console.error(error);
  }
}

// Test Case: Register User
async function testRegisterUser() {
  try {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      mobile: 1234567890,
      houseNumber: '123',
      streetArea: 'Example Street',
      city: 'Example City',
      state: 'Example State',
      pincode: 123456,
      isAdmin: false,
    };

    const response = await makeRequest('POST', 'http://localhost:3000/users/register', newUser);
    console.log('Test Case: Register User - Passed');
    console.log(response);
  } catch (error) {
    console.error('Test Case: Register User - Failed');
    console.error(error);
  }
}

// Test Case: User Login
async function testUserLogin() {
  try {
    const credentials = {
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await makeRequest('POST', 'http://localhost:3000/users/login', credentials);
    console.log('Test Case: User Login - Passed');
    console.log(response);
  } catch (error) {
    console.error('Test Case: User Login - Failed');
    console.error(error);
  }
}

// Execute the test cases
testSeedUsers();
testRegisterUser();
testUserLogin();
