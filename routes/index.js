const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

route.get("/", (req, res) => {
	res.json({
		page: "home",
	});
});

route.post("/user/register", userController.register);
route.post("/user/update/:id", userController.update);
route.post("/user/delete/:id", userController.delete);
route.get("/user/:id", userController.getOne);
route.get("/user", userController.getAll);

module.exports = route;
