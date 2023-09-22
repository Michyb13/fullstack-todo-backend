require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connection = require("./config/connectDB");
const cors = require("cors");

connection();

app.use(cors());

app.use(express.json());
app.use("/todo", require("./Routes/TodoRoute"));

app.listen(port, () => {
  console.log(`Listening on Port ${port}.`);
});
