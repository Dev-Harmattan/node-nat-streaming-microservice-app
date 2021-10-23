import { sign } from 'jsonwebtoken';
import request from 'supertest';
import {app} from '../../app';


describe('Get / Currentuser', () => {
  it('should return current user that match the signup emaeil', async () => {
    const cookie  = await global.signin();
    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

    expect(response.body.currentUser.email).toEqual('user@example.com')


  })
})