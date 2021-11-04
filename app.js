const express = require("express");
const route = require("./routes/index");

// const todo = require("./models/market");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//URL
app.use(route);

//RUNNING SERVER
app.listen(port, () => {
	console.log("listening on port " + port);
});
