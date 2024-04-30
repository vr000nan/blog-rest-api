const express = require('express');
const postsController = require('../controllers/post.controller');
const checkAuthMiddleWare = require('../middleware/check-auth');

const router = express.Router();

router.post("/", checkAuthMiddleWare.checkAuth, postsController.save);
router.get("/", postsController.index);
router.get("/:id", postsController.show);
router.patch("/:id", checkAuthMiddleWare.checkAuth, postsController.update);
router.delete("/:id", checkAuthMiddleWare.checkAuth, postsController.destroy);


module.exports = router;