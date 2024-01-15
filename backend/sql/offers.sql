-- name: AddOffer :one
INSERT INTO offers (user_id, skill, description)
VALUES
    ($1, $2, $3) RETURNING *;

-- name: DeleteOffer :exec
DELETE FROM
    offers
WHERE
    offer_id = $1;

-- name: GetOffers :many
SELECT
    *
FROM offers;

-- name: GetOfferById :one
SELECT
    *
FROM offers
WHERE
    offer_id = $1;

-- name: GetOffersByUser :many
SELECT
    *
FROM offers
WHERE
    user_id = $1;

-- name: GetOffersByCategory :many
SELECT
    created_at,
    offer_id,
    user_id,
    offers.skill,
    description
FROM offers
INNER JOIN skills ON offers.skill = skills.skill
INNER JOIN skill_categories ON skills.skill = skill_categories.skill
WHERE skill_categories.category = $1;
