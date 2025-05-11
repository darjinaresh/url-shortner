const express = require("express");
const { handlegenerateShortUrl, handlegetUrl } = require("../controllers/url");

const router = express.Router();

router.post("/", handlegenerateShortUrl);
router.get("/:shortId", handlegetUrl);

module.exports = router;
