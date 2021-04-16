const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
    req.user = {
      username: 'test_user',
      photoUrl: 'http://image.com/image.png',
    };
  
    next();
  });
  
  describe('gram routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    it('creates a gram via POST', async () => {
      await User.insert({
        username: 'test_user',
        photoUrl: 'http://image.com/image.png',
      });
  
      return request(app)
        .post('/api/v1/gramPost')
        .send({ 
            caption: 'Hello this is some text',
            tags: '#blessed',
            author: 'taylor',
         })
        .then((res) => {
          expect(res.body).toEqual({
            id: '1',
            caption: 'Hello this is some text',
            tags: '#blessed',
            author: 'taylor',
            username: 'test_user',
          });
        });
    });
  });
  








