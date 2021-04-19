const { Router } = require('express');
const Gram = require('../models/Gram');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
	.post('/new', ensureAuth, (req, res, next) => {
		Gram.insertGram({
			...req.body,
			username: req.user.username,
		})
			.then((gram) => res.send(gram))
			.catch(next);
	})

	.get('/', async (req, res, next) => {
		try {
			const grams = await Gram.retrieve();
			res.send(grams);
		} catch (err) {
			next(err);
		}
	})

	.get('/:id', async (req, res, next) => {
		const id = req.params.id;
		try { 
			const gram = await Gram.retrieveById(id);
			res.send(gram);
		} catch (err) {
			next(err);
		}
	})

	.patch('/:id', async (req, res, next) => {
		const id = req.params.id;
		try {
			const gram = await Gram.updateById(req.body, id);
			res.send(gram);
		} catch (err) {
			next(err);
		}
	})

	.delete('/:id', async (req, res, next) => {
		Gram.deleteById(req.params.id)
			.then((gram) => res.send(gram))
			.catch(next);
	});
