import request from 'supertest';
import {app} from '../../app';


describe('POST / signup', () => {
  it('should return 400 with email that does not exist', async () => {
    request(app)
      .post('/api/users/signin')
      .send({
        email: 'kanny@gmail.com',
        password: 'password'
      })
      .expect(400);
  });

  it('should failed when an incorrect password is provided', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'kanny@gmail.com',
        password: 'password'
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({ 
        email: 'kanny@gmail.com',
        password: '444666'
      })
      .expect(409)
  });

  it('should response with cookies given a valide credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'kan@gmail.com',
        password: 'password'
      })
      .expect(201);

  const response = await request(app)
      .post('/api/users/signin')
      .send({ 
        email: 'kan@gmail.com',
        password: 'password'
      })
      .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
  })
})