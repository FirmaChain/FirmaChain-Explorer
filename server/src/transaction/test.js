import app from '../utils/testApp';

describe('transactions', () => {
  it('empty list', async () => {
    await app.get('/api/v1/transactions').expect(200, {
      transactions: [],
      pagination: {
        count: 0,
        offset: 0,
        total: 0,
      },
    });
  });
});
