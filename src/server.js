require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json(200).json({ message: "API is healthy!" });
});

app.listen(port, () => {
  console.log("App is listening...");
});
