const pool = require('../utils/pool');

module.exports = class Comment {
	commentText;
	gramId;
	commentBy;

	constructor(xyz) {
		this.commentText = xyz.comment_text;
		this.gramId = xyz.gram_id;
		this.commentBy = xyz.comment_by;
	}

	static async insert({ commentText, gramId, commentBy }) {
		const {
			rows,
		} = await pool.query(
			`INSERT INTO comments (comment_text, gram_id, comment_by) VALUES ($1, $2, $3) RETURNING *`,
			[commentText, gramId, commentBy]
		);
		return new Comment(rows[0]);
	}
};
