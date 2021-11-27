const router = require("express").Router();

/* GET about us page */
router.get("/", (req, res, next) => {
  res.render("", {});
});

module.exports = router;
