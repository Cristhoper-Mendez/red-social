const express = require('express') ;
const router = express.Router();
import log from "../controllers/login";

router.post('/login', log.login )
// router.get('/login', log.s)

module.exports = router