const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
	static login(req, res) {
		let email = req.body.email;
		User.findOne("email", email)
			.then((data) => {
				if (!data) {
					res.status(401).json({ messege: "Invalid Credentials" });
				} else {
					let compare = bcrypt.compareSync(req.body.password, data.password);
					if (compare == true) {
						let token = jwt.sign(data, "secretKey");
						res.status(200).json({
							Messege: "Login Success",
							Token: token,
						});
						// res.status(200).json({ token: token });
					} else {
						res.status(401).json({ messege: "Invalid Credentials" });
					}
				}
			})
			.catch((err) => res.json(err));
	}

	static loginMiddleware(req, res, next) {
		try {
			let token = req.headers.token;
			let decoded = jwt.verify(token, "secretKey");
			User.findOne("email", decoded.email).then((data) => {
				if (data !== null) {
					req.auth = data.rows;
					next();
				} else {
					res.status(401).json({ messege: "Invalid Credentials" });
				}
			})
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static register(req, res) {
		let email_exist = [];
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(req.body.password, salt);
		let input = {
			email: req.body.email,
			password: hash,
			name: req.body.name,
		};

		User.findAll().then((data) => {
			data.forEach((record) => {
				if (record.email == input.email) {
					email_exist.push(record.email);
				}
			});

			if (email_exist.length > 0) {
				res.status(400).json({
					messege: "Email already registered, use different email",
				});
			} else {
				User.create(req, res, input);
			}
		});
	}

	static update(req, res) {
		let hash;
		let token = req.headers.token;
		let decoded = jwt.verify(token, "secretKey");
		let id = decoded.id;

		//check password similarity
		if (req.body.password) {
			User.findOne("id", id).then((data) => {
				hash = data.password;
				let compare = bcrypt.compareSync(req.body.password, hash);

				if (compare) {
					res.status(400).json({
						msg: "Use different password!",
					});
				}
			});
		}

		User.update(req, res, id);
	}

	static getOne(req, res) {
		let token = req.headers.token;
		let decoded = jwt.verify(token, "secretKey");
		let id = decoded.id;
		User.findOne("id", id).then((data) => {
			res.status(200).json({
				messege: "Success fetch data",
				data,
			});
		});
	}

	static delete(req, res) {
		let id = req.params.id;
		User.delete(req, res, id);
	}
}

module.exports = userController;
