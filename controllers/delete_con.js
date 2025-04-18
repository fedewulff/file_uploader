const prisma = require("../db/queries");

exports.deleteUserPost = async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.user.id,
    },
  });
  res.redirect("/");
};

exports.deleteFolderPost = async (req, res) => {
  console.log("delete", req.params.folderId);
  console.log(req.params);
  await prisma.folder.delete({
    where: {
      id: Number(req.params.folderId),
    },
  });
  res.redirect("/user");
};

exports.deleteFilePost = async (req, res) => {
  console.log("delete", req.params.fileId);
  await prisma.file.delete({
    where: {
      id: Number(req.params.fileId),
    },
  });
  res.redirect("/user");
};
