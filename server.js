const express = require("express");
const config = require("config");
const connectDB = require("./config/connectDB");
const user = require("./routes/user");
const app = express();
app.use(express.json());
const PORT = config.get("PORT");
connectDB;

app.use("/user", user);
app.use("/product");
const port = PORT || 5000;
app.listen(5000, (err) =>
  err ? console.error(err) : console.log("server running on port 5000")
);
