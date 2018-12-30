import request from 'supertest';

import server from '../src/index';

process.env.NODE_ENV = 'test';

describe('GET /random-url', () => {
  it('should return 404', done => {
    request(server)
      .get('/random-url')
      .expect(404, done);
  });
});

describe('Home route tests', () => {
  test('get home route GET /', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toMatchSnapshot();
  });
});
