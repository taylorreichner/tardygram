DROP TABLE IF EXISTS grams CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    github_username TEXT,
    github_photo_url TEXT NOT NULL
);

CREATE TABLE grams (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gram_photo_url TEXT NOT NULL,
    gram_caption TEXT,
    gram_tags TEXT[],
    author BIGINT NOT NULL REFERENCES users(id)
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_text TEXT NOT NULL, 
    gram_id BIGINT NOT NULL REFERENCES grams(id),
    comment_by BIGINT NOT NULL REFERENCES users(id)
);

INSERT INTO users(github_username, github_photo_url)
    VALUES 
        ('test_user', 'test_user_img'),
        ('new_user', 'new_user_image');

INSERT INTO grams(gram_photo_url, gram_caption, gram_tags, author)
    VALUES
        ('gram_url', 'this is a caption', '{"
        tag1", "tag2", "tag3"}', 1),
        ('gram_url', 'this is another caption', '{"tag1", "tag2", "tag3"}', 2);

INSERT INTO comments (comment_text, gram_id, comment_by)
    VALUES
        ('my first comment!', 1, 1),
        ('NEW COMMENT!', 2, 2),
        ('another comment', 1, 1);