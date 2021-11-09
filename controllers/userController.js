const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class userController {
	static register(req, res) {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(req.body.password, salt);
		let input = {
			email: req.body.email,
			password: hash,
			name: req.body.name,
		};

		User.create(req, res, input);
	}

	static update(req, res) {
		let hash;
		let id = req.params.id;

		//check password similarity
		if (req.body.password) {
			User.findOne(id).then((data) => {
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
		let id = req.params.id;
		User.findOne(id).then((data) => {
			res.status(200).json({
				message: "Success fetch data",
				data,
			});
		});
	}

	static getAll(req, res) {
		User.findAll().then((data) => {
			res.status(200).json(data);
		});
	}

	static delete(req, res) {
		let id = req.params.id;
		User.delete(req, res, id);
	}
}

module.exports = userController;
