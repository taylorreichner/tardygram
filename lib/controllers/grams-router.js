const { Router } = require('express');
const Gram = require('../models/Gram');

module.exports = Router()
	.post('/', async (req, res, next) => {
		try {
			const gram = await Gram.insert(req.body);
			res.send(gram);
		} catch (err) {
			next(err);
		}
	})

	//ensureAuth version per Ryan:
	//   .post('/', ensureAuth, (req, res, next) => {
	//     Gram.insert({
	//       caption: req.body.caption,
	//       //or just put "...req.body" to pull everything in
	//       username: req.user.username,
	//       //uname grabbed from the cookie, ignoring any username attached the body as deception
	//     })
	//       .then((gram) => res.send(gram))
	//       .catch(next);
	//   })

	.patch('/:id', async (req, res, next) => {
		const id = req.params.id;
		try {
			const gram = await Gram.updateById(req.body, id);
			res.send(gram);
		} catch (err) {
			next(err);
		}
	});

//   .delete('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     try {
//       const gram = await Gram.deleteById(id);
//       res.send(gram);
//     } catch (err) {
//       next(err);
//     }
//   });