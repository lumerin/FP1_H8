const { Pool } = require("pg");

const db = new Pool({
	user: "postgres",
	host: "localhost",
	database: "reflect_db",
	password: "jepi",
	port: "5433",
});

module.exports = db;
