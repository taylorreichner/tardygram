const { Router } = require('express');
const Gram = require('../models/Gram');
const ensureAuth = require('../middleware/ensureAuth')



module.exports = Router()
	.post('/new', ensureAuth, (req, res, next) => {
  		Gram.insertGram({
   		 ...req.body,
    	username: req.user.username,
  	})
    .then((gram) => res.send(gram))
    .catch(next);
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
	})

 // 	.delete('/:id', async (req, res, next) => {
    
 //   try {
//	 const id = req.params.id;
 //     const gram = await Gram.deleteById(id);
  //    res.send(gram);
 //   } catch (err) {
 //     next(err);
 //   }

 .delete('/:id', async (req, res, next) => {
	Gram
		.deleteById(req.params.id)
		.then(gram => res.send(gram))
		.catch(next)
})


