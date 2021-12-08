import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('Order test', () => {
  it('should return 404 error for unavalaible ticket', async () => {
    // const ticketId = new mongoose.Types.ObjectId().toHexString();
    // await request(app)
    // .post('/api/orders')
    // .set('Cookie', global.signin())
    // .set({ticketId: ticketId})
    // .expect(404);
  });
});
