INSERT INTO users (username, discord_username, password_hash)
VALUES
('admin', 'admin', '$2a$04$uwpFTia9dnbm6qQeNQnODuDGWECMcIXTIXZ..QnUO8wbvgJ/9zbr2'), --password: admin1234
('user', 'user', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'), --password: user1234
('user1', 'user1', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user2', 'user2', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user3', 'user3', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user4', 'user4', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user5', 'user5', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user6', 'user6', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm'),
('user7', 'user7', '$2a$04$mUnuGk9mrOH2ai7hE6f40.83I/cyr.qqS4wTO9YNxrnOF26UQ3nIm');

UPDATE users
SET role = 'admin'
WHERE username = 'admin';

INSERT INTO skills VALUES 
('JavaScript Programming'),
('TypeScript Programming'),
('Java Programming'),
('Golang Programming'),
('Skateboarding'),
('Snowboarding'),
('Skiing'),
('Mountain Biking'),
('Game Development'),
('Software Development'),
('Web Design');

INSERT INTO categories VALUES
('Programming'),
('Computers'),
('Tech'),
('Sports'),
('Outdoors'),
('Games'),
('Software');

INSERT INTO skill_categories VALUES
('JavaScript Programming', 'Programming'),
('JavaScript Programming', 'Computers'),
('JavaScript Programming', 'Tech'),
('Java Programming', 'Programming'),
('Java Programming', 'Computers'),
('Java Programming', 'Tech'),
('TypeScript Programming', 'Programming'),
('TypeScript Programming', 'Computers'),
('TypeScript Programming', 'Tech'),
('Golang Programming', 'Programming'),
('Golang Programming', 'Computers'),
('Golang Programming', 'Tech'),
('Skateboarding', 'Sports'),
('Skateboarding', 'Outdoors'),
('Snowboarding', 'Sports'),
('Snowboarding', 'Outdoors'),
('Skiing', 'Sports'),
('Skiing', 'Outdoors'),
('Mountain Biking', 'Sports'),
('Mountain Biking', 'Outdoors'),
('Game Development', 'Software'),
('Game Development', 'Games'),
('Software Development', 'Software'),
('Software Development', 'Computers'),
('Software Development', 'Tech'),
('Web Design', 'Software'),
('Web Design', 'Computers'),
('Web Design', 'Tech');

('Skateboarding', 'Sports'),
('Skateboarding', 'Summer'),
('Snowboarding', 'Sports'),
('Snowboarding', 'Winter');

INSERT INTO offers (user_id, skill, description) VALUES
(1, 'Golang Programming', 'I am a senior go dev, want to help you'),
(2, 'Skateboarding', 'Do you want to learn some kickflips?'),
(3, 'Snowboarding', 'I can teach you how to do a 360'),
(4, 'Skiing', 'Do you want some skiing basics? I can help you with that!')
(5, 'Mountain Biking', 'I think that you need some help with your biking skills'),
(6, 'Game Development', 'After our lessons you will be able to create your own game!'),
(7, 'Software Development', 'I can teach you how to document your projects properly'),
(8, 'Web Design', 'You will learn how to create a website from scratch'),
(9, 'JavaScript Programming', 'I dont want to help you, its just spam offer');


INSERT INTO report_reasons VALUES
('Spam'),
('Inappropriate'),
('Offensive'),
('Other');

INSERT INTO reports (reporting_user_id, reported_user_id, reported_offer_id, reason, description, status) VALUES
(2, 9, NULL, 'Spam', 'This user is posting spam! Please do something with this', 'TODO'),
(5, NULL, 9, 'Spam', 'Its a spam offer', 'TODO');

INSERT INTO reviews (reviewing_user_id, reviewed_user_id, star_count, review) VALUES
(6, 2, 5, 'Now I am able to do a kickflip!'),
(5, 9, 1, 'This user is spamming!'),
(2, 6, 5, 'He really helped me getting started with GameDev'),
(2, 9, 2, 'Only Spam offers, but they are kinda funny');