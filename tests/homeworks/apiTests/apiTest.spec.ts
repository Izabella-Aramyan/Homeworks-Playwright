import { test, expect } from '@playwright/test';
import { BASE_URL, TOKEN } from './apiConfig';

test('Get users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
        headers: { Authorization: TOKEN },
    });


    //to check exact te status 200
    // expect(response.status()).toBe(200); 
    // const users = await response.json();
    // console.log(users);

    //any successful status code (like 200, 201, 204, etc
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    console.log(users);
});




test('Create a new user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
        headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        data: {
            name: 'Jane',
            email: `jane${Date.now()}@example.com`,
            gender: 'female',
            status: 'active',
        },
    });

    expect(response.ok()).toBeTruthy();

    const newUser = await response.json();
    console.log(newUser);
    console.log('Status:', response.status());
    console.log('Response:', await response.text());
    expect(newUser).toHaveProperty('id');
});


test('Update user with PUT', async ({ request }) => {
    const updateData = {
        name: 'John Smith',
        email: `smith${Date.now()}@example.com`,
        gender: 'male',
        status: 'inactive',
    };
    const userId = 7987077;
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        data: updateData,
    });

    expect(response.ok()).toBeTruthy();

    const updatedUser = await response.json();
    console.log('PUT Updated User:', updatedUser);

    // Check that all fields were updated correctly
    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser.email).toBe(updateData.email);
    expect(updatedUser.gender).toBe(updateData.gender);
    expect(updatedUser.status).toBe(updateData.status);
});


test('Update user status with PATCH', async ({ request }) => {
    const userId = 7987077;

    //updaye only status
    const patchData = {
        status: 'active',
    };

    const response = await request.patch(`${BASE_URL}/users/${userId}`, {
        headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
        },
        data: patchData,
    });

    expect(response.ok()).toBeTruthy();

    const updatedUser = await response.json();
    console.log('PATCH Updated User:', updatedUser);


    expect(updatedUser.status).toBe(patchData.status);
});
