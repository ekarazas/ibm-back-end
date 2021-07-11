const express = require("express");
const router = express.Router();

const Joi = require("joi");
const logger = require("../../config/logger");

router.post("/search", async (req, res) => {
  if (!req.body.keywords) {
    return res.status(400).send({ error: "Incorrect data passed" });
  }

  try {
    const schema = Joi.string().max(40);
    const validateKeywords = await schema.validateAsync(req.body.keywords);
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

router.post("/articles", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.url ||
    !req.body.image ||
    !req.body.publishedAt
  ) {
    return res.status(400).send({ error: "Incorrect data passed" });
  }
  try {
    const schema = Joi.object();
    const validateArticleInfo = await schema.validateAsync(req.body);
    if (validateArticleInfo.error) {
      return res.status(400).send({ error: "Passed data is invalid" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An unexpected error occured. Please try again later" });
  }

  try {
    await logger.log({
      level: "info",
      name: "clickedArticleInfo",
      articleInfo: `title: ${req.body.title}, description: ${req.body.description}, url: ${req.body.url}, image: ${req.body.image}, publishedAt: ${req.body.publishedAt}`,
    });

    return res.send({ status: "Article info is logged" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: "An unexpected error occured. Please try again later" });
  }
});

module.exports = router;
