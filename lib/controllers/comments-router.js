const Router = require('express');
const Comment = require('../models/Comment');

module.exports = Router().post('/new', (req, res, next) => {
	try {
		const newComment = Comment.insert(req.body);
		res.send(newComment);
	} catch (err) {
		next(err);
	}
});
