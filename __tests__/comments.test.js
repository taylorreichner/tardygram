const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('tardygram COMMENT routes', () => {
	beforeEach(() => {
		return setup(pool);
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
					id: '4',
					commentText: 'This is a really great comment!',
					gramId: '1',
					commentBy: '3',
				});
			});
	});

	it('should return a list of all comments', async () => {
		const { body } = await request(app).get('/api/v1/comments');

		expect(body).toEqual([
			{
				id: '1',
				commentText: 'my first comment!',
				gramId: '1',
				commentBy: '1',
			},
			{
				id: '2',
				commentText: 'NEW COMMENT!',
				gramId: '2',
				commentBy: '2',
			},
			{
				id: '3',
				commentText: 'another comment',
				gramId: '1',
				commentBy: '1',
			},
		]);
	 });

	// it('should delete a comment with the given id', async () => {
	//     const { body } = await request(app).delete('/api/v1/comments/3')

	// })
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
