export function buildPetstoreOrder(overrides: Partial<any> = {}) {
  const id = Date.now();

  return {
    id,
    petId: 12345,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: true,
    ...overrides,
  };
}

export function buildCheckoutUser(overrides: Partial<any> = {}) {
  return {
    firstName: 'Test',
    lastName: 'Engineer',
    postalCode: 'TE57 123',
    ...overrides,
  };
}