const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/login", authController.login);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  authController.login
);
router.get("/logout", authController.logout);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", authController.register);

module.exports = router;
