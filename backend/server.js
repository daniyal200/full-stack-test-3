const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/todos',require('./routes/todoRoutes'))

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });

module.exports = server;