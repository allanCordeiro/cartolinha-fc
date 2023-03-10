package repository

import (
	"database/sql"

	"github.com/AllanCordeiro/cartolinha/ms-consolidador/internal/infra/db"
)

type Repository struct {
	dbConn *sql.DB
	*db.Queries
}
