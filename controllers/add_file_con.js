const { urlencoded } = require("express");
const prisma = require("../db/queries");

exports.addFileGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folderId = req.params.folderId;
  res.render("add_file", { user: req.user, folderId: folderId || null });
};

exports.addFilePost = async (req, res) => {
  const folderId = req.params.folderId;
  const file = req.file;
  const { id } = req.user;
  const name = new Date().toString();
  console.log(file);
  // function getNumberFromFolderId() {
  //   if (folderId) {
  //     return Number(folderId);
  //   } else return null;
  // }
  // await prisma.file.create({
  //   data: {
  //     name: name,
  //     file: file,
  //     userId: id,
  //     folderId: getNumberFromFolderId(),
  //   },
  // });
  // if (folderId) {
  //   res.redirect(`/folder/${folderId}`);
  //   return;
  // }
  res.redirect("/user");
};
