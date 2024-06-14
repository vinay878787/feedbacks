const express = require("express");
const router = express.Router();

const { processFeedback, getFeedback } = require("../controllers/feedback")

router.route("/submitFeedback").post(processFeedback);
router.route("/getFeedback").get(getFeedback);

module.exports = router;