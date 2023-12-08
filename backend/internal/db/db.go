package db

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5"
)

const defaultTimeout = 3 * time.Second

type DB struct {
	*Queries
	*pgx.Conn
}

func NewDB(dsn string) (*DB, error) {
	ctx, cancel := context.WithTimeout(context.Background(), defaultTimeout)
	defer cancel()

	conn, err := pgx.Connect(ctx, "user=pqgotest dbname=pqgotest sslmode=verify-full")

	if err != nil {
		return nil, err
	}

	db := New(conn)

	return &DB{db, conn}, nil
}
