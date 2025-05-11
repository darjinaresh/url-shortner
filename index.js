const express = require("express");

const { connecttoMongoDb } = require("./db");

const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connecttoMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongodb connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
