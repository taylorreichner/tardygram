const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Gram = require('../lib/models/Gram');
const User = require('../lib/models/User')

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
		  .post('/api/v1/grams/new')
		  .send({ 
			  caption: 'Hello this is some text',
			  tags: ['blessed'],
			  author: 1,
			  photoUrl: 'yo',
		   })
		  .then((res) => {
			expect(res.body).toEqual({
			  id: '3',
			  caption: 'Hello this is some text',
			  tags: ['blessed'],
			  author: '1',
			  photoUrl: 'yo',
			  
			});
		  });
	  });

	// beforeEach(async () => {
	// 	//User.insert
	// 	const gramOne = await Gram.insert({
	// 		photoUrl: 'https://bit.ly/fcc-relaxing-cat',
	// 		caption: 'He just woke up',
	// 		tags: ['yes', 'no', 'maybe'],
	// 		author: 'melvin',
	// 	});
	// 	await Gram.insert({
	// 		photoUrl: 'https://bit.ly/fcc-relaxing-cat',
	// 		caption: '',
	// 		tags: ['yes', 'no', 'maybe'],
	// 		author: 'sarah',
	// 	});
	// 	console.log(gramOne);
	// });

	it('updates a gram by id', () => {
		return request(app)
			.patch('/api/v1/grams/2')
			.send({
				caption: 'We had a great time in Denmark',
			})
			.then((res) => {
				expect(res.body).toEqual({
					id: '2',
					photoUrl: 'gram_url',
					caption: 'We had a great time in Denmark',
					tags: [
						"tag1",
        			    "tag2",
      				    "tag3",
						],
					author: '2',
				});
			});
	});

	   it('deletes a gram by id', () => {
	     return request(app)
	      .delete('/api/v1/grams/1')
	      .then((res) => {
	        expect(res.body).toEqual({
			  id: '1',
	          photoUrl: 'gram_url',
	          caption: 'this is a caption',
	          tags: ['tag1', 'tag2', 'tag3'],
	          author: '1',
	        });
	      });
	  });



});
