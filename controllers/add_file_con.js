const prisma = require("../db/queries");

exports.addFileGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("add_file", { user: req.user });
};

exports.addFilePost = async (req, res) => {
  const { fileName } = req.body;
  const { id } = req.user;
  const folder = req.params.folderId || null;
  await prisma.file.create({
    data: {
      name: fileName,
      file: "test",
      userId: id,
      folderId: folder,
    },
  });
  res.redirect("/user/:folderId?/file");
};
