const express = require('express');
const router = express.Router();

import home from "../controllers/home";
import img from "../controllers/images";
import { verifyAuth } from "../middlewares/authenticate";
import { auth } from "../middlewares/auth";

//get all images
router.get('/images', home.index);
//get one image
router.get('/images/:image_id', auth, img.index);
//create a post image
router.post('/newImage', verifyAuth, img.createPost);
//add like a image
router.post('/images/:image_id/like', verifyAuth, img.like);
//create a comment for one image
router.post('/images/:image_id/comment', verifyAuth, img.comment);
//delete image
router.delete('/images/:image_id', verifyAuth, img.deleteImg);

module.exports = router;