-- name: GetOfferCountByUser :one
SELECT
    COALESCE(COUNT(*), 0) AS count
FROM offers
WHERE
    user_id = $1;

-- name: GetReportCountByUser :one
SELECT
    COALESCE(COUNT(*), 0) AS count
FROM reports
WHERE
    reported_user_id = $1;

-- name: GetReviewCountByUser :one
SELECT
    COALESCE(COUNT(*), 0) AS count
FROM reviews
WHERE reviewing_user_id = $1;


-- name: GetReviewCountByStars :many
SELECT star_count, COALESCE(COUNT(*), 0) AS count
FROM reviews
GROUP BY star_count;


-- name: GetAverageStarsByUser :one
SELECT
    COALESCE(AVG(star_count), 0) AS average
FROM reviews
WHERE
    reviewed_user_id = $1;

-- name: GetUserCount :one
SELECT
    COALESCE(COUNT(*), 0) AS count
FROM users;

-- name: GetOfferCountByCategory :many
SELECT skill_categories.category, COALESCE(COUNT(skill_categories.category), 0) AS count
FROM offers
INNER JOIN skills ON offers.skill = skills.skill
INNER JOIN skill_categories ON skills.skill = skill_categories.skill
GROUP BY skill_categories.category;

-- name: GetOfferCountBySkill :many
SELECT skill, COALESCE(COUNT(*), 0) AS count
FROM offers
GROUP BY skill;

-- name: GetOfferCount :one
SELECT
    COALESCE(COUNT(*), 0) AS count
FROM offers;