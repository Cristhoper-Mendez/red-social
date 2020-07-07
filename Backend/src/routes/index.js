const express = require('express');
const router = express.Router();

import home from "../controllers/home";
import img from "../controllers/images";
import { verifyAuth } from "../middlewares/authenticate";

router.get('/images', home.index)
router.get('/images/:image_id', img.index)
router.post('/newImage', verifyAuth, img.createPost)
router.post('/images/:image_id/like',  img.like)
router.post('/images/:image_id/comment', verifyAuth, img.comment)
router.delete('/images/:image_id', img.deleteImg)


module.exports = router;