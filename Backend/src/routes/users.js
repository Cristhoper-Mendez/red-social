import express from "express";
const router = express.Router();
import user from "../controllers/users";
import { Image } from "../models";
import { verifyAuth } from "../middlewares/authenticate";

router.post('/newUser', user.createUsers)
router.get('/newUser', user.s)
// router.get('/profile', verifyAuth, async (req, res) => {
//     const userId = req.user._id;
//     try {
//         const postDB = await Image.find({userId})
//         res.json(postDB)
//     } catch (error) {
//         return res.status(400).json({
//                 message: 'error',
//                 error
//         })
//     }
// })
router.get('/profile', verifyAuth, user.profile)

module.exports = router