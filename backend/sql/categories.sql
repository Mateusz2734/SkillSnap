-- name: AddCategory :one
INSERT INTO categories (category)
VALUES
    ($1) RETURNING *;

-- name: DeleteCategory :exec
DELETE FROM
    categories
WHERE
    category = $1;

-- name: GetCategories :many
SELECT
    *
FROM categories;