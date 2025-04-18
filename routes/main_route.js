const { Router } = require("express");
const main_route = Router();
const home_con = require("../controllers/home_con");
const login_con = require("../controllers/login_con");
const signup_con = require("../controllers/signup_con");
const user_con = require("../controllers/user_con");
const add_folder_con = require("../controllers/add_folder_con");
const add_file_con = require("../controllers/add_file_con");
const folder_data_con = require("../controllers/folder_data_con");
const file_data_con = require("../controllers/file_data_con");
const delete_con = require("../controllers/delete_con");
const update_con = require("../controllers/update_con");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

console.log(__dirname);
console.log(__filename);
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
main_route.get("/add_file{/:folderId}", add_file_con.addFileGet);
main_route.post("/add_file{/:folderId}", upload.single("file"), add_file_con.addFilePost);
//FOLDER PROFILE
main_route.get("/folder/:folderId", folder_data_con.folderProfileGet);
//FILE PROFILE
main_route.get("/file/:fileId", file_data_con.fileDataGet);
//DELETE USER
main_route.post("/user/:userId/delete", delete_con.deleteUserPost);
//UPDATE FOLDER
main_route.get("/folder/:folderId/update", update_con.updateFolderGet);
main_route.post("/folder/:folderId/update", update_con.updateFolderPost);
//DELETE FOLDER
main_route.post("/folder/:folderId/delete", delete_con.deleteFolderPost);
//DELETE FILE
main_route.post("/file/:fileId/delete", delete_con.deleteFilePost);

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
