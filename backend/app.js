const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');

const authRouter = require("./routes/authRouter");

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/auth", authRouter);

module.exports = app;
