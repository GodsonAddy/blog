const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

// Get all news

const article = [];
const newsfeed = [
  {
    name: "BBC",
    address: "https://www.bbc.com/news/business-11428889",
    base: "https://www.bbc.com",
  },
];
router.get("/", async (req, res) => {
  const { page } = req.query;
  const limit = 20;
  const startIndex = Number(page - 1) * limit;
  const endIndex = Number(page) * limit;

  newsfeed.forEach(async (feed) => {
    const feeder = await axios.get(feed.address);
    try {
      const html = feeder.data;
      const $ = cheerio.load(html);

      $(".lx-stream__post-container", html).each(function () {
        const title = $(this).find(".lx-stream-post__header-text").text();
        const url = $(this).find("a").attr("href");
        const urlImage = $(this)
          .find(".qa-story-image-wrapper img")
          .attr("src");
        const description = $(this).find(".qa-contributor-role p").text();
        const timestamp = $(this).find("time .gs-u-vh").text();
        const author = $(this).find(".qa-contributor-name").text();

        article.push({
          title,
          url: feed.base + url,
          urlImage,
          description,
          source: feed.name,
          timestamp,
          author,
        });
      });

      const articles = article.slice(startIndex, endIndex);
      const totalResults = Number(articles.length);

      const numberofpages = Math.ceil(totalResults / limit);
      console.log(totalResults);
      res.status(200).json({
        total: totalResults,
        curentPage: Number(page),
        numberOfPages: numberofpages,
        news: articles,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error", error });
    }
  });
});

module.exports = router;
