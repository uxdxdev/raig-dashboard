var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/raig';

module.exports = connectionString;
