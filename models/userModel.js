const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

class User {
	static async findOne(attr, value) {
		let instance = await db.query(
			`SELECT * FROM "users" WHERE ${attr} = '${value}'`
		);
		return instance.rows[0];
	}

	static async findAll() {
		let instance = await db.query(`SELECT * FROM "users"`);
		return instance.rows;
	}

	static create(req, res, data) {
		db.query(
			`INSERT INTO "users" (email,password,name) VALUES ('${data.email}','${data.password}','${data.name}') RETURNING *`,
			(err, result) => {
				if (err) {
					res.json(err);
				} else {
					res.status(201).json({
						msg: "Success create user",
						data: result.rows[0],
					});
				}
			}
		);
	}

	static update(req, res, id) {
		let instance = this.findOne("id", id);
		instance.then(async function (data) {
			if (req.body.email) {
				await db.query(
					`UPDATE "users" SET email = '${req.body.email}' WHERE id = '${data.id}' `
				);
			}

			if (req.body.name) {
				await db.query(
					`UPDATE "users" SET name = '${req.body.name}' WHERE id = '${data.id}' `
				);
			}

			if (req.body.password) {
				let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(req.body.password, salt);
				await db.query(
					`UPDATE "users" SET password = '${hash}' WHERE id = '${data.id}' `
				);
			}

			res.json({
				msg: "Berhasil update user",
			});
		});
	}

	static delete(req, res, id) {
		let instance = this.findOne("id", id);
		instance.then(async function (data) {
			await db.query(`DELETE FROM "users" WHERE id = ${data.id}`);
			res.status(200).json({
				messege: "Success delete user",
			});
		});
	}
}

module.exports = User;
