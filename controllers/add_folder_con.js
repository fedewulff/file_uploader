const prisma = require("../db/queries");

exports.addFolderGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("add_folder");
};

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
