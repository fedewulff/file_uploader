const { Router } = require("express");
const main_route = Router();
const home_con = require("../controllers/home_con");
const signup_con = require("../controllers/signup_con");
const user_con = require("../controllers/user_con");
const folder_con = require("../controllers/folder_con");
const file_con = require("../controllers/file_con");

const multer = require("../middleware/multer");

//HOME
main_route.get("/", home_con.homeGet);
//SIGN UP
main_route.get("/signup", signup_con.signupGet);
main_route.post("/signup", signup_con.signupPost);
//LOG IN
// main_route.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/user",
//     failureRedirect: "/",
//     failureFlash: true,
//   })
// );
// main_route.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/", failureMessage: true }),
//   function (req, res) {
//     res.redirect("/user");
//   }
// );
main_route.post("/login", home_con.loginTry);

//USER
main_route.get("/user", user_con.userGet);
//DELETE USER
main_route.post("/user/:userId/delete", user_con.deleteUserPost);

//ADD FOLDER
main_route.get("/add_folder", folder_con.addFolderGet);
main_route.post("/add_folder", folder_con.addFolderPost);
//FOLDER PROFILE
main_route.get("/folder/:folderId", folder_con.folderProfileGet);
//UPDATE FOLDER
main_route.get("/folder/:folderId/update", folder_con.updateFolderGet);
main_route.post("/folder/:folderId/update", folder_con.updateFolderPost);
//DELETE FOLDER
main_route.post("/folder/:folderId/delete", folder_con.deleteFolderPost);

//ADD FILE
main_route.get("/add_file{/:folderId}", file_con.addFileGet);
main_route.post("/add_file{/:folderId}", multer.upload.single("file"), file_con.addFilePost);
//FILE PROFILE
main_route.get("/file/:fileId", file_con.fileDataGet);
//DOWNLOAD FILE
main_route.get("/file/:fileId/download", file_con.fileDownloadGet);
//DELETE FILE
main_route.post("/file/:fileId/delete", file_con.deleteFilePost);

//LOG OUT
main_route.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("logout");
    console.log(req.session);
    res.redirect("/");
  });
});

main_route.get("/*splat", async (req, res) => {
  res.render("404error");
});

module.exports = main_route;
