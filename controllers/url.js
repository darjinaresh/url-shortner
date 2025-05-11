const shortid = require("shortid");
const URL = require("../models/url");

async function handlegenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function handlegetUrl(req, res) {
  const shortId = req.params.shortId;

  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(401).json({ error: "short url not found" });
  }

  res.redirect(entry.redirectURL);
}

module.exports = {
  handlegenerateShortUrl,
  handlegetUrl,
};
