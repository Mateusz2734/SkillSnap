// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: users.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const addAdmin = `-- name: AddAdmin :one
UPDATE users 
SET role = 'admin' 
WHERE user_id = $1 RETURNING created_at, user_id, username, discord_username, password_hash, role
`

// //////////////// ADMINS ////////////////
func (q *Queries) AddAdmin(ctx context.Context, userID int32) (*User, error) {
	row := q.db.QueryRow(ctx, addAdmin, userID)
	var i User
	err := row.Scan(
		&i.CreatedAt,
		&i.UserID,
		&i.Username,
		&i.DiscordUsername,
		&i.PasswordHash,
		&i.Role,
	)
	return &i, err
}

const addUser = `-- name: AddUser :one
INSERT INTO users (username, discord_username, password_hash)
VALUES
    ($1, $2, $3) RETURNING user_id, username, discord_username
`

type AddUserParams struct {
	Username        string      `json:"username"`
	DiscordUsername pgtype.Text `json:"discordUsername"`
	PasswordHash    string      `json:"passwordHash"`
}

type AddUserRow struct {
	UserID          int32       `json:"userId"`
	Username        string      `json:"username"`
	DiscordUsername pgtype.Text `json:"discordUsername"`
}

// //////////////// USERS ////////////////
func (q *Queries) AddUser(ctx context.Context, arg AddUserParams) (*AddUserRow, error) {
	row := q.db.QueryRow(ctx, addUser, arg.Username, arg.DiscordUsername, arg.PasswordHash)
	var i AddUserRow
	err := row.Scan(&i.UserID, &i.Username, &i.DiscordUsername)
	return &i, err
}

const deleteAdmin = `-- name: DeleteAdmin :exec
UPDATE users
SET role = 'user'
WHERE user_id = $1 RETURNING created_at, user_id, username, discord_username, password_hash, role
`

func (q *Queries) DeleteAdmin(ctx context.Context, userID int32) error {
	_, err := q.db.Exec(ctx, deleteAdmin, userID)
	return err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM 
    users 
WHERE 
    user_id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, userID int32) error {
	_, err := q.db.Exec(ctx, deleteUser, userID)
	return err
}

const getAdminByUserId = `-- name: GetAdminByUserId :one
SELECT
    created_at, user_id, username, discord_username, password_hash, role
FROM users
WHERE user_id = $1 AND role = 'admin'
`

func (q *Queries) GetAdminByUserId(ctx context.Context, userID int32) (*User, error) {
	row := q.db.QueryRow(ctx, getAdminByUserId, userID)
	var i User
	err := row.Scan(
		&i.CreatedAt,
		&i.UserID,
		&i.Username,
		&i.DiscordUsername,
		&i.PasswordHash,
		&i.Role,
	)
	return &i, err
}

const getAdmins = `-- name: GetAdmins :many
SELECT
    created_at, user_id, username, discord_username, password_hash, role
FROM users
WHERE role = 'admin'
`

func (q *Queries) GetAdmins(ctx context.Context) ([]*User, error) {
	rows, err := q.db.Query(ctx, getAdmins)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []*User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.CreatedAt,
			&i.UserID,
			&i.Username,
			&i.DiscordUsername,
			&i.PasswordHash,
			&i.Role,
		); err != nil {
			return nil, err
		}
		items = append(items, &i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByDiscordUsername = `-- name: GetUserByDiscordUsername :one
SELECT 
    created_at, user_id, username, discord_username, password_hash, role
FROM users
WHERE discord_username = $1
`

func (q *Queries) GetUserByDiscordUsername(ctx context.Context, discordUsername pgtype.Text) (*User, error) {
	row := q.db.QueryRow(ctx, getUserByDiscordUsername, discordUsername)
	var i User
	err := row.Scan(
		&i.CreatedAt,
		&i.UserID,
		&i.Username,
		&i.DiscordUsername,
		&i.PasswordHash,
		&i.Role,
	)
	return &i, err
}

const getUserById = `-- name: GetUserById :one
SELECT 
    created_at, user_id, username, discord_username, password_hash, role
FROM users
WHERE user_id = $1
`

func (q *Queries) GetUserById(ctx context.Context, userID int32) (*User, error) {
	row := q.db.QueryRow(ctx, getUserById, userID)
	var i User
	err := row.Scan(
		&i.CreatedAt,
		&i.UserID,
		&i.Username,
		&i.DiscordUsername,
		&i.PasswordHash,
		&i.Role,
	)
	return &i, err
}

const getUserByUsername = `-- name: GetUserByUsername :one
SELECT 
    created_at, user_id, username, discord_username, password_hash, role
FROM users
WHERE username = $1
`

func (q *Queries) GetUserByUsername(ctx context.Context, username string) (*User, error) {
	row := q.db.QueryRow(ctx, getUserByUsername, username)
	var i User
	err := row.Scan(
		&i.CreatedAt,
		&i.UserID,
		&i.Username,
		&i.DiscordUsername,
		&i.PasswordHash,
		&i.Role,
	)
	return &i, err
}

const getUsers = `-- name: GetUsers :many
SELECT
    created_at, user_id, username, discord_username, password_hash, role
FROM users
`

func (q *Queries) GetUsers(ctx context.Context) ([]*User, error) {
	rows, err := q.db.Query(ctx, getUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []*User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.CreatedAt,
			&i.UserID,
			&i.Username,
			&i.DiscordUsername,
			&i.PasswordHash,
			&i.Role,
		); err != nil {
			return nil, err
		}
		items = append(items, &i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
