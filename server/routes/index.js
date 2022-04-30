const router = require("express").Router();
const Controller = require("../controllers/controller")

router.get("/feeds", Controller.getFeeds)


module.exports = router;