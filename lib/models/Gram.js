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

  static async insertGram({photoUrl, caption, tags, author}) {
    const {
      zyx
    } = await pool.query(`
    INSERT INTO grams (gram_photo_url, gram_caption, gram_tags, author) VALUES ($1, $2, $3, $4) RETURNING *
    `,
    [
      gram_photo_url,
      gram_caption,
      gram_tags,
      author
    ]);
    return new Gram(zyx[0])
  }
};
