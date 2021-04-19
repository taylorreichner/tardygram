const auth = require('../controllers/auth');
const pool = require('../utils/pool');
const Comment = require('./Comment');
const User = require('./User');


module.exports = class Gram {
	id;
	photoUrl;
	caption;
	tags;
	author;

	constructor(xyz) {
		this.id = xyz.id;
		this.photoUrl = xyz.gram_photo_url;
		this.caption = xyz.gram_caption;
		this.tags = xyz.gram_tags;
		this.author = xyz.author;
	}

	static async insertGram({ photoUrl, caption, tags, author }) {
		const { rows } = await pool.query(
			`
    INSERT INTO grams (gram_photo_url, gram_caption, gram_tags, author) VALUES ($1, $2, $3, $4) RETURNING *
    `,
			[photoUrl, caption, tags, author]
		);
		return new Gram(rows[0]);
	}

	static async retrieve() {
		const { rows } = await pool.query('SELECT * FROM grams');
		return rows.map((row) => new Gram(row));
	}

	static async retrieveById(id) {
		const { rows } = await pool.query(`
	SELECT 
	grams.id,
	grams.gram_photo_url,
	grams.gram_caption,
	grams.gram_tags,
	users.github_username,
	comments.comment_text
	FROM grams
	INNER JOIN comments
	on grams.id = comments.gram_id
	INNER JOIN users
	ON comments.comment_by = users.id
	WHERE grams.id = $1`, [id]);
		return {
			...new User(rows[0]),
			...new Gram(rows[0]),
			...new Comment(rows[0])
		};
	}

	static async updateById(gram, id) {
		const {
			rows,
		} = await pool.query(
			'UPDATE grams SET gram_caption=$1 WHERE id=$2 RETURNING *',
			[gram.caption, id]
		);
		if (!rows[0]) {
			throw new Error(`No gram with id ${id} found`);
		}
		return new Gram(rows[0]);
	}

	static async deleteById(id) {
		const { rows } = await pool.query(
			`DELETE FROM grams WHERE id=$1 RETURNING *
      `,
			[id]
		);
		return new Gram(rows[0]);
	}

	static async topGrams() {
		const { rows } = await pool.query(`
		SELECT 
		grams.id,
		grams.gram_photo_url,
		grams.gram_caption,
		grams.gram_tags,
		COUNT(comments.id) AS count
		FROM grams
		INNER JOIN comments
		on grams.id = comments.gram_id
		GROUP BY grams.id
		ORDER BY count DESC
		LIMIT 10`,
			
		);
		return rows.map((row) => new Gram(row));
	}
};
