const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const logger = require("../config/logger");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.post("/search", async (req, res) => {
  if (!req.body.keywords) {
    return res.status(400).send({ error: "Incorrect data passed" });
  }

  try {
    const schema = Joi.string().max(40);
    const validateKeywords = schema.validate(req.body.keywords);
    if (validateKeywords.error) {
      return res.status(400).send({ error: "Passed data is invalid" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "An unexpected error occured. Please try again later" });
  }

  try {
    const keywordArr = req.body.keywords
      .split(" ")
      .filter((word) => word.trim());

    await logger.log({
      level: "info",
      name: "searchInfo",
      searchedKeywords: `${keywordArr}`,
    });

    return res.send({ status: "Searched keywords are logged" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An unexpected error occured. Please try again later" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));
