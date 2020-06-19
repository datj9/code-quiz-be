const express = require("express");
const router = express.Router();
const questionController = require("./controller");
const { uploadQuestionImage } = require("../../../middlewares/upload");

router.get("/", questionController.getQuestions);
router.post("/", questionController.createQuestion);
router.post("/upload-image", uploadQuestionImage);

module.exports = router;
