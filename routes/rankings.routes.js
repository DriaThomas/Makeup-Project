const router = require("express").Router();

/* GET rankings page */
router.get("/", (req, res, next) => {
  res.render("rankings");
});

module.exports = router;
