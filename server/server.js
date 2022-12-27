const express = require("express");
require("dotenv").config();

// express app
const app = express();
const mongoose = require("mongoose");
const DeadRouter = require("./routes/deadline");

// middleware

app.use(express.json());
// Can use the following to parse urlencoded bodies

app.use((req, res, next) => {
  console.log("middleware");
  console.log(req.path, req.method);
  next();
});

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to Db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

// routes
app.use("/api/deadlines", DeadRouter);
