const express = require("express");
const router = express.Router();
const uploadController = require("../controller/uploadController");

router.post("/api/upload", uploadController.uploadFile);


module.exports = router;