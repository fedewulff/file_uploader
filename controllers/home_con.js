exports.homeGet = async (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.redirect("/user");
    return;
  }
  res.render("home");
};
