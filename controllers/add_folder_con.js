const prisma = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.addFolderGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("add_folder");
};

const validateSignUp = [
  body("folderName").trim().notEmpty().withMessage("Folder name cannot be empty"),
];

exports.addFolderPost = async (req, res) => {
  const { folderName } = req.body;
  const { id } = req.user;
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: id,
    },
  });
  res.redirect("/user");
};
