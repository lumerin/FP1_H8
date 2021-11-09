const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Reflect = require("../controllers/reflectController");
const userController = require("../controllers/userController");

route.get("/", (req, res) => {
	res.json({
		page: "home",
	});
});

route.post("/api/v1/login", userController.login);
route.post("/api/v1/register", userController.register);

// Login middleware
route.use(userController.loginMiddleware);

//USER
// User CRUD
route.get("/api/v1/user/", userController.getOne);
route.post("/api/v1/user/update", userController.update);
route.post("/api/v1/user/delete/:id", userController.delete);

//REFLECTIONS
//CREATE & TAKE
route.route("/api/v1/reflections")
    .post(Reflect.create)
    .get(Reflect.take);
//UPDATE & DELETE
route.route("/api/v1/reflections/:id")
    .put(Reflect.change)
    .delete(Reflect.remove);

module.exports = route

