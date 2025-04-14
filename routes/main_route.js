const { Router } = require("express");
const main_route = Router();
const home_con = require("../controllers/home_con");
const login_con = require("../controllers/login_con");
const signup_con = require("../controllers/signup_con");
const user_con = require("../controllers/user_con");
const add_folder_con = require("../controllers/add_folder_con");
const add_file_con = require("../controllers/add_file_con");
const folder_data_con = require("../controllers/folder_data_con");

//HOME
main_route.get("/", home_con.homeGet);
//SIGN UP
main_route.get("/signup", signup_con.signupGet);
main_route.post("/signup", signup_con.signupPost);
//LOG IN
main_route.post("/login", login_con.logInPost);
//USER
main_route.get("/user", user_con.userGet);
//ADD FOLDER
main_route.get("/add_folder", add_folder_con.addFolderGet);
main_route.post("/add_folder", add_folder_con.addFolderPost);
//ADD FILE
main_route.get("/add_file", add_file_con.addFileGet);
main_route.post("/add_file", add_file_con.addFilePost);
//FOLDER PROFILE
main_route.get("/folder/:id", folder_data_con.folderProfileGet);
//LOG OUT
main_route.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = main_route;
