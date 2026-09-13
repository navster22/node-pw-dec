const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.set("view engine", "pug");

// Need to Setup Views

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

// Setup remaining middlewares



// Rote setup is needed

app.use(errorHandler);


module.exports = app;