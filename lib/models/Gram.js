const pool = require('../utils/pool');

module.exports = class Gram {
	photoUrl;
	caption;
	tags;
	author;

	constructor(xyz) {
		this.photoUrl = xyz.gram_photo_url;
		this.caption = xyz.gram_caption;
		this.tags = xyz.gram_tags;
		this.author = xyz.author;
	}

	static async insert(gram) {
		const {
			rows,
		} = await pool.query(
			'INSERT INTO grams (gram_photo_url, gram_caption, gram_tags, author) VALUES ($1, $2, $3, $4) RETURNING *',
			[gram.photoUrl, gram.caption, gram.tags, gram.author]
		);
		return new Gram(rows[0]);
	}

	static async updateById(gram, gramId) {
		const {
			rows,
		} = await pool.query(
			'UPDATE grams SET gram_caption=$1 WHERE gram_id=$2 RETURNING *',
			[gram.caption, gramId]
		);
		if (!rows[0]) {
			throw new Error(`No gram with id ${gramId} found`);
		}
		return new Gram(rows[0]);
	}
};
