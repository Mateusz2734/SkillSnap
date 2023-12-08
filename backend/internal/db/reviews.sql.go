// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.24.0
// source: reviews.sql

package db

import (
	"context"
)

const addReview = `-- name: AddReview :one
INSERT INTO reviews (reviewing_user_id, reviewed_user_id, star_count, review)
VALUES
    ($1, $2, $3, $4) RETURNING created_at, review_id, reviewing_user_id, reviewed_user_id, star_count, review
`

type AddReviewParams struct {
	ReviewingUserID int32
	ReviewedUserID  int32
	StarCount       int32
	Review          string
}

func (q *Queries) AddReview(ctx context.Context, arg AddReviewParams) (*Review, error) {
	row := q.db.QueryRow(ctx, addReview,
		arg.ReviewingUserID,
		arg.ReviewedUserID,
		arg.StarCount,
		arg.Review,
	)
	var i Review
	err := row.Scan(
		&i.CreatedAt,
		&i.ReviewID,
		&i.ReviewingUserID,
		&i.ReviewedUserID,
		&i.StarCount,
		&i.Review,
	)
	return &i, err
}

const deleteReview = `-- name: DeleteReview :exec
DELETE FROM
    reviews
WHERE
    review_id = $1
`

func (q *Queries) DeleteReview(ctx context.Context, reviewID int32) error {
	_, err := q.db.Exec(ctx, deleteReview, reviewID)
	return err
}

const getReviewById = `-- name: GetReviewById :one
SELECT
    created_at, review_id, reviewing_user_id, reviewed_user_id, star_count, review
FROM reviews
WHERE review_id = $1
`

func (q *Queries) GetReviewById(ctx context.Context, reviewID int32) (*Review, error) {
	row := q.db.QueryRow(ctx, getReviewById, reviewID)
	var i Review
	err := row.Scan(
		&i.CreatedAt,
		&i.ReviewID,
		&i.ReviewingUserID,
		&i.ReviewedUserID,
		&i.StarCount,
		&i.Review,
	)
	return &i, err
}

const getReviews = `-- name: GetReviews :many
SELECT
    created_at, review_id, reviewing_user_id, reviewed_user_id, star_count, review
FROM reviews
`

func (q *Queries) GetReviews(ctx context.Context) ([]*Review, error) {
	rows, err := q.db.Query(ctx, getReviews)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []*Review
	for rows.Next() {
		var i Review
		if err := rows.Scan(
			&i.CreatedAt,
			&i.ReviewID,
			&i.ReviewingUserID,
			&i.ReviewedUserID,
			&i.StarCount,
			&i.Review,
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

const getReviewsByReviewedUser = `-- name: GetReviewsByReviewedUser :many
SELECT
    created_at, review_id, reviewing_user_id, reviewed_user_id, star_count, review
FROM reviews
WHERE reviewed_user_id = $1
`

func (q *Queries) GetReviewsByReviewedUser(ctx context.Context, reviewedUserID int32) ([]*Review, error) {
	rows, err := q.db.Query(ctx, getReviewsByReviewedUser, reviewedUserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []*Review
	for rows.Next() {
		var i Review
		if err := rows.Scan(
			&i.CreatedAt,
			&i.ReviewID,
			&i.ReviewingUserID,
			&i.ReviewedUserID,
			&i.StarCount,
			&i.Review,
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

const getReviewsByReviewingUser = `-- name: GetReviewsByReviewingUser :many
SELECT
    created_at, review_id, reviewing_user_id, reviewed_user_id, star_count, review
FROM reviews
WHERE reviewing_user_id = $1
`

func (q *Queries) GetReviewsByReviewingUser(ctx context.Context, reviewingUserID int32) ([]*Review, error) {
	rows, err := q.db.Query(ctx, getReviewsByReviewingUser, reviewingUserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []*Review
	for rows.Next() {
		var i Review
		if err := rows.Scan(
			&i.CreatedAt,
			&i.ReviewID,
			&i.ReviewingUserID,
			&i.ReviewedUserID,
			&i.StarCount,
			&i.Review,
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