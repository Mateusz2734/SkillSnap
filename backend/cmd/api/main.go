package main

import (
	"context"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"runtime/debug"
	"sync"

	"github.com/Mateusz2734/wdai-project/backend/internal/db"
	"github.com/Mateusz2734/wdai-project/backend/internal/version"

	"github.com/lmittmann/tint"
)

func main() {
	logger := slog.New(tint.NewHandler(os.Stdout, &tint.Options{Level: slog.LevelDebug}))

	err := run(logger)
	if err != nil {
		trace := string(debug.Stack())
		logger.Error(err.Error(), "trace", trace)
		os.Exit(1)
	}
}

type config struct {
	baseURL   string
	httpPort  int
	basicAuth struct {
		username       string
		hashedPassword string
	}
	cookie struct {
		secretKey string
	}
	db struct {
		dsn string
	}
	jwt struct {
		secretKey string
	}
}

type application struct {
	config config
	db     *db.DB
	logger *slog.Logger
	wg     sync.WaitGroup
}

func run(logger *slog.Logger) error {
	var cfg config

	flag.StringVar(&cfg.baseURL, "base-url", "http://localhost:4444", "base URL for the application")
	flag.IntVar(&cfg.httpPort, "http-port", 4444, "port to listen on for HTTP requests")
	flag.StringVar(&cfg.basicAuth.username, "basic-auth-username", "admin", "basic auth username")
	flag.StringVar(&cfg.basicAuth.hashedPassword, "basic-auth-hashed-password", "$2a$04$uwpFTia9dnbm6qQeNQnODuDGWECMcIXTIXZ..QnUO8wbvgJ/9zbr2", "basic auth password hashed with bcrypt")
	flag.StringVar(&cfg.cookie.secretKey, "cookie-secret-key", "eksj5rzofufmxg5jjfqlzzvjhf3jdl5y", "secret key for cookie authentication/encryption")
	flag.StringVar(&cfg.db.dsn, "db-dsn", "postgresql://admin:admin@localhost:5432/wdai?sslmode=disable", "postgreSQL DSN")
	flag.StringVar(&cfg.jwt.secretKey, "jwt-secret-key", "hooi7qxyfyxucv6xzfag6ke4tp5ec3qi", "secret key for JWT authentication")

	showVersion := flag.Bool("version", false, "display version and exit")

	flag.Parse()

	if *showVersion {
		fmt.Printf("version: %s\n", version.Get())
		return nil
	}

	db, err := db.NewDB(cfg.db.dsn) //(cfg.db.dsn, cfg.db.automigrate)
	if err != nil {
		return err
	}
	defer db.Close(context.Background())

	app := &application{
		config: cfg,
		db:     db,
		logger: logger,
	}

	return app.serveHTTP()
}
