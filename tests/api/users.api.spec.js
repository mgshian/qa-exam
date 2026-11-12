
import { test, expect } from '@playwright/test';
import { userTestData } from '../../test-data/users-data.js';
const expectedUsers = require('../../test-data/users.expected.json');

// API requests need their own host; the configured baseURL is for the UI.
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

test.describe('Scenario 4: Users API Validation', () => {

  // TC_API_001: GET ALL USERS
  test('TC_API_001 - GET Request: Retrieve all users', async ({ request }) => {

    // Send GET request
    const response = await request.get(USERS_API_URL);

    // Verify status and content type
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type'])
      .toContain('application/json');

    const users = await response.json();

    // Validate response array
    expect(Array.isArray(users)).toBe(true);
    // The fixture verifies the complete array, including each user's schema and values.
    expect(users).toEqual(expectedUsers);

    console.log(`Retrieved ${users.length} users`);

  });


  // TC_API_002: GET SINGLE USER
  test('TC_API_002 - GET Request: Retrieve single user', async ({ request }) => {

    const userId = userTestData.existingUserId;

    // Send GET request
    const response = await request.get(`${USERS_API_URL}/${userId}`);

    // Verify status and content type
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type'])
      .toContain('application/json');

    const user = await response.json();

    // Compare the returned resource with the expected record for the requested ID.
    const expectedUser = expectedUsers.find(({ id }) => id === userId);
    expect(expectedUser).toBeDefined();
    expect(user).toEqual(expectedUser);

    console.log('Retrieved user:', user.name);

  });


  // TC_API_003: POST CREATE USER
  test('TC_API_003 - POST Request: Create a new user', async ({ request }) => {

    const payload = userTestData.newUser;

    // Send POST request
    const response = await request.post(USERS_API_URL, {
      data: payload,
    });

    // Verify status and content type
    expect(response.status()).toBe(201);
    expect(response.headers()['content-type'])
      .toContain('application/json');

    const createdUser = await response.json();

    // Verify submitted data matches response
    expect(createdUser).toMatchObject(payload);

    // Verify generated ID exists and is numeric
    expect(createdUser.id).toEqual(expect.any(Number));
    // New resources must not reuse an ID from the existing-user fixture.
    expect(expectedUsers.some(({ id }) => id === createdUser.id)).toBe(false);

    console.log('Created user:', createdUser);
    console.log('Generated user ID:', createdUser.id);

  });

});
