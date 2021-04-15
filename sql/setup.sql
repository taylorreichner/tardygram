DROP TABLE IF EXISTS grams CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_photo_url TEXT NOT NULL
);

CREATE TABLE grams (
    gram_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gram_photo_url TEXT NOT NULL,
    gram_caption TEXT,
    gram_tags TEXT[],
    author TEXT NOT NULL REFERENCES users(github_username)
);

CREATE TABLE comments (
    comment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_text TEXT NOT NULL, 
    gram_id BIGINT NOT NULL REFERENCES grams(gram_id),
    comment_by TEXT NOT NULL REFERENCES users(github_username)
);