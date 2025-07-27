const express = require("express");
const router = express.Router();
const { generateREADME } = require("../controllers/generateController");

router.post("/", generateREADME);

module.exports = router;
