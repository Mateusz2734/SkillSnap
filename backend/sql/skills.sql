-- name: AddSkill :one
INSERT INTO skills (skill)
VALUES
    ($1) RETURNING *;

-- name: DeleteSkill :exec
DELETE FROM
    skills
WHERE
    skill = $1;

-- name: GetSkills :many
SELECT
    *
FROM skills;

-- name: GetSkill :one
SELECT
    *
FROM skills
WHERE
    skill = $1;