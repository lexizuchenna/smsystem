const router = require("express").Router();

const { viewResult, checkResult } = require("../controllers/result");

const { pResult } = require("../middlewares/auth");

router.route("/").get(pResult, viewResult);
router.route("/verify").get(pResult, checkResult);

module.exports = router;
