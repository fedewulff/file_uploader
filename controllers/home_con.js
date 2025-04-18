exports.homeGet = async (req, res) => {
  if (req.user) {
    res.redirect("/user");
    return;
  }
  res.render("home");
};
