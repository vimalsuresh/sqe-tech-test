import { APIRequestContext } from '@playwright/test';
import env from '../config/env';

export class PetstoreClient {
  constructor(private request: APIRequestContext) {}

  async createOrder(order: Record<string, unknown>) {
    const response = await this.request.post(`${env.petstoreBaseUrl}/store/order`, {
      data: order,
    });
    return response;
  }

  async getOrderById(orderId: number) {
    const response = await this.request.get(`${env.petstoreBaseUrl}/store/order/${orderId}`);
    return response;
  }

  async deleteOrder(orderId: number) {
    const response = await this.request.delete(`${env.petstoreBaseUrl}/store/order/${orderId}`);
    return response;
  }
}