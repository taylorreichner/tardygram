const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const seed = require('../data/seed');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
	req.user = {
		username: 'test_user',
		photoUrl: 'http://image.com/image.png',
	};

	next();
});

describe('tardygram COMMENT routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	beforeEach(() => {
		return seed();
	});

	it('should create a new comment by POST', () => {
		return request(app)
			.post('/api/v1/comments/new')
			.send({
				commentText: 'This is a really great comment!',
				gramId: '1',
				commentBy: '3',
			})
			.then((res) => {
				expect(res.body).toEqual({
					id: expect.any(String),
					commentText: 'This is a really great comment!',
					gramId: '1',
					commentBy: '3',
				});
			});
	});

	it('should DELETE a comment with the given id', () => {
		return request(app)
			.delete('/api/v1/comments/2')
			.then(({ body }) =>
				expect(body).toEqual({
					id: '2',
					commentText: 'NEW COMMENT!',
					gramId: '2',
					commentBy: '2',
				})
			);
	});
});
