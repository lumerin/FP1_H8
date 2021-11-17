const db = require('../db');

class Reflection {
	//Ambil deluruh data masing-masing owner
	static async read(response, owner_id) {
		await db.query(
			`
            SELECT id, success, low_point, take_away, owner_id, created_date + 1 as created_date, modified_date + 1 as modified_date FROM "reflections"
            WHERE owner_id = ${owner_id} ORDER BY id ASC;
        `,
			(err, result) => {
				if (err) {
					response.status(500).json(err);
					console.log(owner_id);
				} else {
					response.status(200).json({ msg: 'Success', data: result.rows });
				}
			}
		);
	}
	//Input data
	static insert(response, data) {
		db.query(
			`
            INSERT INTO "reflections" (success, low_point, take_away, owner_id, created_date) values
            ('${data.success}', '${data.low_point}', '${data.take_away}', '${data.owner_id}', 'now') RETURNING id, success, low_point, take_away, owner_id, created_date + 1 as created_date, modified_date + 1 as modified_date;
        `,
			(err, result) => {
				if (err) {
					response.status(500).json(err);
					console.log(err);
				} else {
					response
						.status(201)
						.json({ msg: 'Success create reflection', data: result.rows });
				}
			}
		);
	}

	// get one data reflection
	static async findOne(id_value, owner_id_value) {
		let instance = await db.query(
			`SELECT * FROM "reflections" WHERE id = '${id_value}' AND owner_id = '${owner_id_value}'`
		);
		return instance.rows[0];
	}

	//Update data
	static update(req, res, data_req) {
		let instance = this.findOne(data_req.id, data_req.owner_id);
		console.log(instance);

		instance
			.then(async function (data) {
				if (req.body.success != undefined) {
					await db.query(
						`UPDATE "reflections" SET success = '${req.body.success}' 
                     WHERE id = '${data.id}' AND owner_id = '${data.owner_id}'`
					);
				}

				if (req.body.low_point != undefined) {
					await db.query(
						`UPDATE "reflections" SET low_point = '${req.body.low_point}' 
                    WHERE id = '${data.id}' AND owner_id = '${data.owner_id}'`
					);
				}

				if (req.body.take_away != undefined) {
					await db.query(
						`UPDATE "reflections" SET take_away = '${take_away}' 
                    WHERE id = '${data.id}' AND owner_id = '${data.owner_id}'`
					);
				}

				res.json({ msg: 'Success update reflection', data });
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	}

	static delete(response, data) {
		db.query(
			`
            DELETE FROM "reflections" WHERE id = ${data.id} AND owner_id = ${data.owner_id} RETURNING id, success, low_point, take_away, owner_id, created_date + 1 as created_date, modified_date + 1 as modified_date;
        `,
			(err, result) => {
				if (err) {
					response.status(500).json(err);
					console.log(err);
				} else {
					if (result.rows == '') {
						response.status(401).json({ msg: 'Invalid Credentials' });
					} else {
						response
							.status(201)
							.json({ msg: 'Success deleted reflection', data: result.rows });
					}
				}
			}
		);
	}
}
module.exports = Reflection;
