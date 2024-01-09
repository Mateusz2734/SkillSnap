-- //////////////// REPORTS ////////////////
-- name: AddReport :one
INSERT INTO reports (reporting_user_id, reported_offer_id, reason, description, status)
VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING *;

-- name: DeleteReport :exec
DELETE FROM
    reports
WHERE
    report_id = $1;

-- name: GetReports :many
SELECT
    *
FROM reports;

-- name: GetReportById :one
SELECT
    *
FROM reports
WHERE
    report_id = $1;

-- name: GetReportsByReportedOffer :many
SELECT
    *
FROM reports
WHERE
    reported_offer_id = $1;

-- name: GetReportsByReason :many
SELECT
    *
FROM reports
WHERE
    reason = $1;

-- //////////////// REASONS ////////////////
-- name: GetReasons :many
SELECT
    *
FROM report_reasons;

-- name: AddReason :one
INSERT INTO report_reasons (reason)
VALUES
    ($1) RETURNING *;

-- name: DeleteReason :exec
DELETE FROM
    report_reasons
WHERE
    reason = $1;

-- name: GetReason :one
SELECT
    *
FROM report_reasons
WHERE
    reason = $1;