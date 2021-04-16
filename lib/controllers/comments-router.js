const Router = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
	.post('/new', ensureAuth, async (req, res, next) => {
		try {
			const newComment = await Comment.insert({
				...req.body,
				username: req.user.username,
			});
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
