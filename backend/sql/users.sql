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
    user_id, username, discord_username  
FROM users;

-- name: GetUserById :one 
SELECT 
    user_id, username, discord_username
FROM users
WHERE user_id = $1;

-- name: GetUserByUsername :one
SELECT 
    user_id, username, discord_username
FROM users
WHERE username = $1;

-- //////////////// ADMINS ////////////////
-- name: AddAdmin :one
INSERT INTO admins (user_id)
VALUES
    ($1) RETURNING *;

-- name: DeleteAdmin :exec
DELETE FROM
    admins
WHERE
    user_id = $1;

-- name: GetAdmins :many
SELECT
    *
FROM admins;
