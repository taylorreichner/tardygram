const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;

const sign = (payload) => {
	return jwt.sign({ ...payload }, APP_SECRET, {
		expiresIn: '24h',
	});
};

const verify = (token) => {
	return jwt.verify(token, APP_SECRET);
};

module.exports = {
	sign,
	verify,
};
