const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Reflect = require("../controllers/reflectController");

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