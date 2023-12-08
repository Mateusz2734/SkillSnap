-- name: AddReview :one
INSERT INTO reviews (reviewing_user_id, reviewed_user_id, star_count, review)
VALUES
    ($1, $2, $3, $4) RETURNING *;

-- name: DeleteReview :exec
DELETE FROM
    reviews
WHERE
    review_id = $1;

-- name: GetReviews :many
SELECT
    *
FROM reviews;

-- name: GetReviewById :one
SELECT
    *
FROM reviews
WHERE review_id = $1;

-- name: GetReviewsByReviewedUser :many
SELECT
    *
FROM reviews
WHERE reviewed_user_id = $1;

-- name: GetReviewsByReviewingUser :many
SELECT
    *
FROM reviews
WHERE reviewing_user_id = $1;