import request from 'supertest';
import {app} from '../../app';

describe('POST / user signup', () => {
  it('should return 201 response on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'sodiq@gmail.com',
        password: 'lekan123'
      })
      .expect(201);
  });
  
  it('should return 400 response on invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'sodiq@gmail',
        password: 'lekan123'
      })
      .expect(400);
  });

  it('should return 400 response on invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'sodiq@gmail',
        password: 'l'
      })
      .expect(400);
  });

  it('should return 400 response on empty email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'lekan123'
      })
      .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'lekan123@gmail.com'
    })
    .expect(400);
  });

  it('should disallow duplicate email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'lekan123@gmail.com',
        password: 'password'
      })
      .expect(201)
    
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'lekan123@gmail.com',
        password: 'password'
      })
      .expect(409)
  });

  it('should set cookies after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'le@gmail.com',
        password: 'password'
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  })

  it('should response with json on successful signup', async () => {
    request(app)
      .post('/api/users/signup')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      expect(201)
  })
});

