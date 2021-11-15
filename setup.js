const db = require("./db")

db.query(`
    CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        PRIMARY KEY (id)
    );
`, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result.rows)
    }
})

db.query(`
    CREATE TABLE IF NOT EXISTS "reflections" (
        id SERIAL NOT NULL,
        success VARCHAR,
        low_point VARCHAR,
        take_away VARCHAR,
        owner_id INTEGER,
        created_date DATE,
        modified_date DATE,
        PRIMARY KEY (id),
        FOREIGN KEY (owner_id)
            REFERENCES users(id)
    );
`, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result.rows)
    }
})