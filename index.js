const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// import environment variables
require("dotenv").config();

const app = express();

const authRoutes = require("./api/routes/auth.routes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.status(200).send("API is live !");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Handle Error thrown by API
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("server running on port:", process.env.SERVER_PORT);
  if (process.env.SERVER_PORT === "80") {
    // PRODUCTION DEPLOYMENT
  }
});
