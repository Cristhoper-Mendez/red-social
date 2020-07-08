import express from "express";
const router = express.Router();
import user from "../controllers/users";
import { Image } from "../models";
import { verifyAuth } from "../middlewares/authenticate";

router.post('/newUser', user.createUsers)
router.get('/newUser', user.s)
router.get('/profile', verifyAuth, user.profile)

module.exports = router