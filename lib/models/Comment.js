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
};
