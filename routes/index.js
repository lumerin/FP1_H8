const route = require("express").Router();
const userController = require("../controllers/userController");

route.get("/", (req, res) => {
	res.json({
		page: "home",
	});
});

route.post("/user/login", userController.login);
route.post("/user/register", userController.register);

// Login middleware
route.use(userController.loginMiddleware);

route.get("/user", userController.getOne);
route.post("/user/update", userController.update);
route.post("/user/delete/:id", userController.delete);

module.exports = route;
