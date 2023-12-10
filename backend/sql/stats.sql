-- name: GetOfferCountByUser :one
SELECT
    user_id, COUNT(*)
FROM offers
WHERE
    user_id = $1;

-- name: GetReportCountByUser :one
SELECT
    reported_user_id, COUNT(*)
FROM reports
WHERE
    reported_user_id = $1;

-- name: GetReviewCountByUser :one
SELECT
    reviewing_user_id, COUNT(*)
FROM reviews
WHERE reviewing_user_id = $1;


-- name: GetReviewCountByStars :many
SELECT star_count, COUNT(*)
FROM reviews
GROUP BY star_count;


-- name: GetAverageStarsByUser :one
SELECT
    reviewed_user_id, AVG(star_count)
FROM reviews
WHERE
    reviewed_user_id = $1;

-- name: GetUserCount :one
SELECT
    COUNT(*)
FROM users;

-- name: GetOfferCountByCategory :many
SELECT skill_categories.category, COUNT(skill_categories.category)
FROM offers
INNER JOIN skills ON offers.skill = skills.skill
INNER JOIN skill_categories ON skills.skill = skill_categories.skill
GROUP BY skill_categories.category;

-- name: GetOfferCountBySkill :many
SELECT skill, COUNT(*)
FROM offers
GROUP BY skill;

-- name: GetOfferCount :one
SELECT
    COUNT(*)
FROM offers;