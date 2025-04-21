const passport = require("passport");
require("../authentication");

exports.loginGet = async (req, res) => {
  res.render("login");
};

exports.logInPost = (req, res) => {
  res.redirect("user");
};
