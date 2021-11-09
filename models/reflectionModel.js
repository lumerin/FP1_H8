const db = require("../db");

class Reflection {
    //Ambil deluruh data masing-masing owner
    static read ( response, owner_id) {
        db.query(`
		SELECT id, success, low_point, take_away, created_date + 1 as created_date, modified_date + 1 as modified_date FROM "reflections" WHERE owner_id = ${owner_id};
        `, (err, result) => {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(200).json({ msg: "Sukses", data: result.rows });
            }
        });
    }
    //Input data
    static insert ( response, data) {
        db.query(`
            INSERT INTO "reflections" (success, low_point, take_away, owner_id, created_date) values
            ('${data.success}', '${data.low_point}', '${data.take_away}', 1, 'now') RETURNING id, success, low_point, take_away, created_date + 1 as created_date, modified_date + 1 as modified_date;
        `, (err, result) => {
            if (err) {
                response.status(500).json(err);
                console.log(err);
            } else {
                response.status(201).json({ msg: "Sukses", data: result.rows });
            }
        });
    }
    //Update data
    static update (response, data) {
        db.query(`
            UPDATE "reflections" SET success = '${data.success}', low_point = '${data.low_point}', take_away = '${data.take_away}', modified_date = 'now'
            WHERE id = ${data.id} RETURNING id, success, low_point, take_away, created_date + 1 as created_date, modified_date + 1 as modified_date;
        `, (err, result) => {
            if (err) {
                response.status(500).json(err);
                console.log(err);
            } else {
                response.status(201).json({ msg: "Sukses", data: result.rows });
            }
        });
    }

    static delete (response, id) {
        db.query(`
            DELETE FROM "reflections" WHERE id = ${id} RETURNING id, success, low_point, take_away, created_date + 1 as created_date, modified_date + 1 as modified_date;
        `, (err, result) => {
            if (err) {
                response.status(500).json(err);
                console.log(err);
            } else {
                response.status(201).json({ msg: "Sukses", data: result.rows });
            }
        });
    }
}
module.exports = Reflection;