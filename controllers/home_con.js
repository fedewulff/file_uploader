exports.homeGet = async (req, res) => {
  if (req.user) {
    res.redirect("/user");
    return;
  }
  console.log(req.session.messages);
  const loginErrorMessage = req.session.messages;
  res.render("home", { error: loginErrorMessage });

  req.session.destroy();
};
