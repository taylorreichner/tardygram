const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram COMMENT routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	it('should create a new comment by POST', async () => {
		const { body } = await request(app).post('/api/v1/comments/new').send({
			commentText: 'This is a really great comment!',
			gramId: '1',
			commentBy: '3',
		});

		expect(body).toEqual({
			commentText: 'This is a really great comment!',
			gramId: '1',
			commentBy: '3',
		});
	});

	it('should return a list of all comments', async () => {
		const { body } = await request(app).get('/api/v1/comments');

		expect(body).toEqual([
			{
				commentText: expect.any(string),
				gramId: expect.any(Number),
				commentBy: expect.any(Number),
			},
		]);
	});
});

// POST /comments
// requires authentication
// create a new comment
// respond with the comment
// HINT: get the user who created the comment from req.user.

// DELETE /comments/:id
// requires authentication
// delete a comment by id
// respond with the deleted comment
// NOTE: make sure the user attempting to delete the comment owns it
