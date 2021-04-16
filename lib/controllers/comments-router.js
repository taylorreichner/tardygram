const Router = require('express');
const Comment = require('../models/Comment');

module.exports = Router()
	.post('/new', async (req, res, next) => {
		try {
			const newComment = await Comment.insert(req.body);
			res.send(newComment);
		} catch (err) {
			next(err);
		}
	})
	.get('/', async (req, res, next) => {
		try {
			const allComments = await Comment.select();
			res.send(allComments);
		} catch (err) {
			next(err);
		}
	});
