const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Gram = require('../lib/models/Gram');

describe('gram routes', () => {
	beforeEach(() => {
		return setup(pool);
	});

	beforeEach(async () => {
		//User.insert
		const gramOne = await Gram.insert({
			photoUrl: 'https://bit.ly/fcc-relaxing-cat',
			caption: 'He just woke up',
			tags: ['yes', 'no', 'maybe'],
			author: 'melvin',
		});
		await Gram.insert({
			photoUrl: 'https://bit.ly/fcc-relaxing-cat',
			caption: '',
			tags: ['yes', 'no', 'maybe'],
			author: 'sarah',
		});
		console.log(gramOne);
	});

	it('updates a gram by id', () => {
		return request(app)
			.patch('/api/v1/grams/2')
			.send({
				caption: 'We had a great time in Denmark',
			})
			.then((res) => {
				console.log('here it is', res.body);
				expect(res.body).toEqual({
					gramId: 2,
					photoUrl: 'https://bit.ly/fcc-relaxing-cat',
					caption: 'We had a great time in Denmark',
					tags: ['yes', 'no', 'maybe'],
					author: 'sarah',
				});
			});
	});

	//   it('deletes a gram by id', () => {
	//     return request(app)
	//       .delete('/api/v1/grams/1')
	//       .then((res) => {
	//         expect(res.body).toEqual({
	//           photoUrl: 'https://bit.ly/fcc-relaxing-cat',
	//           caption: 'He just woke up',
	//           tags: ['yes', 'no', 'maybe'],
	//           author: 11,
	//         });
	//       });
	//   });
});
