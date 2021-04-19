const Gram = require('../lib/models/Gram');
const Comment = require('../lib/models/Comment');
const faker = require('faker');

const photoUrl = faker.image.nightlife();
const caption = faker.lorem.words(5);
const tags = [faker.lorem.words(3)];

const commentText = faker.lorem.paragraph(2);

module.exports = async () => {
	const postArr = await Promise.all(
		[...Array(20)].map((_, i) => {
			return Gram.insertGram({
				photoUrl,
				caption,
				tags,
				author: Math.ceil(Math.random() * 4),
			});
		})
	);

	const commentArr = await Promise.all(
		[...Array(20)].map((_, i) => {
			return Comment.insert({
				commentText,
				gramId: postArr[Math.floor(Math.random() * 20)].id,
				commentBy: Math.ceil(Math.random() * 4),
			});
		})
	);

	// console.log(postArr, commentArr);

	// return request(app)
	//     .post('/api/v1/grams/new')
	//     .send({
	//         photoUrl: gram_photo_url,
	//         caption: caption,
	//         tags: tags,
	//         author: 1
	//     })
	// 		.then((gram) => res.send(gram))
	// 		.catch(next);
	// });
};
