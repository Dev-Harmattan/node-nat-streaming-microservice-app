import request from 'supertest';
import {app} from '../../app';
import mongoose from 'mongoose';

jest.mock('../../nats-wrapper');

describe('Update ticket / PUT', () => {
  it('should return 404 status for invalid ticket id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Ball',
      price: 10
    })
    .expect(404);
  })

  it('should return 401 status if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Ball',
      price: 10
    })
    .expect(401);
  })

  it('should 401 status if the user does not own the ticket', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ball',
      price: 10
    })
    .expect(201);

    const res = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Ball',
      price: 1000
    })
    .expect(401)


  })

  it('should return 404 for invalid title and price inputs', async () => {
    const cookie =  global.signin();

    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'ball',
      Price: 100
    });


    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      Price: -10
    })
    .expect(400)

    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      Price: 10
    })
    .expect(400)
  })
  
})