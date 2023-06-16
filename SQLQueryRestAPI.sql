CREATE DATABASE RestApiDB;
GO
USE;

CREATE TABLE Users(
    user_id INT PRIMARY KEY IDENTITY(1, 1),
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
);

CREATE TABLE Posts(
    post_id INT PRIMARY KEY IDENTITY(1, 1),
    title VARCHAR(30) NOT NULL,
    content VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Comments(
    comment_id INT PRIMARY KEY IDENTITY(1, 1),
    content VARCHAR(150) NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE NO ACTION
);

-- Inserting data into the Users table
INSERT INTO Users (username, email, password)
VALUES ('Cmwendwa', 'mwendwa@example.com', 'password123'),
       ('Smalanga', 'malanga@example.com', 'pass456'),
       ('Imuriuki', 'muriuki@example.com', 'test789'),
       ('Fnjoki', 'njoki@example.com', 'passw0rd'),
       ('Kcomba', 'comba@example.com', 'secure123');

-- Inserting data into the Posts table
INSERT INTO Posts (title, content, user_id)
VALUES ('First Post', 'Hello, this is my first post.', 1),
       ('Second Post', 'Today, I want to talk about...', 2),
       ('Important Announcement', 'Please read this important announcement!', 3),
       ('New Recipe', 'Check out this delicious recipe I just tried.', 4),
       ('Travel Adventures', 'Sharing my travel experiences.', 5);

-- Inserting data into the Comments table
INSERT INTO Comments (content, user_id, post_id)
VALUES ('Great post!', 2, 1),
       ('I completely agree.', 3, 1),
       ('Nice recipe. I will try it!', 4, 4),
       ('Sounds like an amazing trip!', 5, 5),
       ('Interesting topic.', 1, 2);

