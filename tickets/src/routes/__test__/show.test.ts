import request from 'supertest';
import mongoose from 'mongoose';
import {app} from '../../app';



describe('Show ticket / GEt', () => {
  it('should return 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
    .get(`/api/ticket/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
  })


  it('should return the ticket for invalid ID', async () => {
    const title = 'Movie'
    const price = 10

    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({title, price})
    .expect(201);

    const res = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

    expect(res.body.title).toEqual(title);
    expect(res.body.price).toEqual(price);
  })
})