const Router = require('express');
const ensureAuth = require('../middleware/ensureAuth');
const Comment = require('../models/Comment');

module.exports = Router()
	.post('/new', ensureAuth, (req, res, next) => {
		Comment.insert({
			...req.body,
			username: req.user.username,
		})
			.then((newComment) => res.send(newComment))
			.catch(next);
	})
	.get('/', (req, res, next) => {
		Comment.select()
			.then((allComments) => res.send(allComments))
			.catch(next);
	})
	.delete('/:id', ensureAuth, (req, res, next) => {
		const id = req.params.id;
		Comment.delete(id)
			.then((deletedComment) => res.send(deletedComment))
			.catch(next);
	});
