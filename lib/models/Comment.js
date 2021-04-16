const pool = require('../utils/pool');

module.exports = class Comment {
	id;
	commentText;
	gramId;
	commentBy;

	constructor(xyz) {
		this.id = xyz.id;
		this.commentText = xyz.comment_text;
		this.gramId = xyz.gram_id;
		this.commentBy = xyz.comment_by;
	}

	static async insert({ commentText, commentBy, gramId}) {
		console.log('HELLLOO', commentBy)
		const { rows } = await pool.query(
			`INSERT INTO comments (
                comment_text, comment_by, gram_id )
                VALUES ($1, $2, $3)
                RETURNING *`,
			[commentText, commentBy, gramId]
		);
		return new Comment(rows[0]);
	}

	static async select() {
		const { rows } = await pool.query(`SELECT * FROM comments`);
		return rows.map((comment) => new Comment(comment));
	}
};
