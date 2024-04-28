const express = require('express');
const postsController = require('../controllers/post.controller');

const router = express.Router();

router.post("/", postsController.save);
router.get("/", postsController.index);
router.get("/:id", postsController.show);

module.exports = router;