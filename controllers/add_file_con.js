const prisma = require("../db/queries");

exports.addFileGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }

  const folderId = req.params.folderId;
  console.log(req.params.folderId);
  res.render("add_file", { user: req.user, folderId: folderId });
};

exports.addFilePost = async (req, res) => {
  const { fileName, file } = req.body;
  const { id } = req.user;
  const folder = req.params.folderId || null;
  console.log(req.params);
  // await prisma.file.create({
  //   data: {
  //     name: fileName,
  //     file: file,
  //     userId: id,
  //     folderId: folder,
  //   },
  // });
  res.redirect("/user");
};
