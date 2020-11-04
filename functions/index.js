const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(functions.config().stripe.secret);

// API

// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("hello world"));

// Listen command
exports.api = functions.https.onRequest(app);
