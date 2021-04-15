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
};
