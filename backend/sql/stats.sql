-- name: GetOfferCountByUser :one
SELECT
    COUNT(*)
FROM offers
WHERE
    user_id = $1;

-- name: GetReportCountByUser :one
SELECT
    COUNT(*)
FROM reports
WHERE
    reported_user_id = $1;

-- name: GetReviewCountByUser :one
SELECT
    COUNT(*)
FROM reviews
WHERE reviewing_user_id = $1;


-- name: GetReviewCountByStars :one
SELECT COUNT(*)
FROM reviews
GROUP BY star_count;


-- name: GetAverageStarsByUser :one
SELECT
    AVG(star_count)
FROM reviews
WHERE
    reviewed_user_id = $1;

-- name: GetUserCount :one
SELECT
    COUNT(*)
FROM users;

-- name: GetOfferCountByCategory :one
SELECT COUNT(skill_categories.category)
FROM offers
INNER JOIN skills ON offers.skill = skills.skill
INNER JOIN skill_categories ON skills.skill = skill_categories.skill
GROUP BY skill_categories.category;

-- name: GetOfferCountBySkill :one
SELECT COUNT(*)
FROM offers
GROUP BY skill;

-- name: GetOfferCount :one
SELECT
    COUNT(*)
FROM offers;