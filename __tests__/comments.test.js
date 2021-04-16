const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe.skip('tardygram COMMENT routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	it('should create a new comment by POST', async () => {
		const comment = {
			commentText: 'This is a cool comment!',
		};

		const { body } = await request(app)
			.post('/api/v1/comments/new', comment)
			.send({
				commentText: 'This is a really great comment!',
				gramId: 1,
				commentBy: 1,
			});

		expect(body).toEqual({
			commentId: 4,
			commentText: 'This is a really great comment!',
			gramId: 1,
			commentBy: 1,
		});
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
