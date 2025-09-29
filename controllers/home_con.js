const passport = require("passport")
require("../middleware/authentication")

exports.homeGet = async (req, res) => {
  if (req.user) {
    res.redirect("/user")
    return
  }

  if (req.cookies.data) {
    res.render("home", { messages: req.cookies.data.message })
    res.clearCookie("data")
    return
  }
  res.render("home", { messages: "" })
}

exports.loginTry = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err) // will generate a 500 error
    }
    if (!user) {
      res.cookie("data", { message: "Invalid inputs" })
      return res.redirect("/")
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr)
      }
      return res.redirect("user")
    })
  })(req, res, next)
}
