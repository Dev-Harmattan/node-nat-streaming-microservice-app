import request from 'supertest';
import {app} from '../../app';
import {Ticket} from '../../models/ticket';


describe('Create tickets / POST', () => {
  it('should have route handler listen to /api/tickets for post request', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({})
    
    expect(response.status).not.toEqual(404);
  })

  it('can only be accessed if user is authenticated', async () => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
  });

  it('should return status other than 401 if user is authenticaated', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
    
    expect(response.status).not.toEqual(404);
  })

  it('should return error if valid title not provided', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10
    })
    .expect(400);
  })

  it('should return error if valid price not provided', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ball',
      price: ''
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ball'
    })
    .expect(400);
  })

  it('should create tickets for valid inputs', async () => {

    let tickets =  await Ticket.find({});
    expect(tickets.length).toEqual(0);
    const titlle = 'Ball'
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Ball',
      price: 10
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(10);
    expect(tickets[0].title).toEqual(titlle);
  });
})