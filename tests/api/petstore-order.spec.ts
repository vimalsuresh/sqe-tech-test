import { test, expect } from '@playwright/test';
import { PetstoreClient } from '../../src/api/petstore.client';
import { buildPetstoreOrder } from '../../src/data/test-data.factory';

test.describe('Petstore API', () => {
  test('should create and retrieve an order successfully', async ({ request }) => {
    const client = new PetstoreClient(request);
    const order = buildPetstoreOrder();

    const createResponse = await client.createOrder(order);
    expect(createResponse.status()).toBe(200);

    const createdBody = await createResponse.json();
    expect(createdBody.id).toBe(order.id);
    expect(createdBody.status).toBe(order.status);
    expect(createdBody.quantity).toBe(order.quantity);

    const getResponse = await client.getOrderById(order.id);
    expect(getResponse.status()).toBe(200);

    const fetchedBody = await getResponse.json();
    expect(fetchedBody.id).toBe(order.id);
    expect(fetchedBody.status).toBe(order.status);
  });
});