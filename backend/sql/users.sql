-- //////////////// USERS ////////////////
-- name: AddUser :one
INSERT INTO users (username, discord_username, password_hash)
VALUES
    ($1, $2, $3) RETURNING user_id, username, discord_username;

-- name: DeleteUser :exec
DELETE FROM 
    users 
WHERE 
    user_id = $1;

-- name: GetUsers :many
SELECT
    *
FROM users;

-- name: GetUserById :one 
SELECT 
    *
FROM users
WHERE user_id = $1;

-- name: GetUserByUsername :one
SELECT 
    *
FROM users
WHERE username = $1;

-- //////////////// ADMINS ////////////////
-- name: AddAdmin :one
UPDATE users 
SET role = 'admin' 
WHERE user_id = $1 RETURNING *;


-- name: DeleteAdmin :exec
UPDATE users
SET role = 'user'
WHERE user_id = $1 RETURNING *;

-- name: GetAdmins :many
SELECT
    *
FROM users
WHERE role = 'admin';

-- name: GetAdminByUserId :one
SELECT
    *
FROM users
WHERE user_id = $1 AND role = 'admin';