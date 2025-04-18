const prisma = require("../db/queries");

exports.folderProfileGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folder = await prisma.folder.findMany({
    where: {
      id: Number(req.params.folderId),
    },
  });
  const files = await prisma.file.findMany({
    where: {
      folderId: Number(req.params.folderId),
    },
  });
  const folderId = req.params.folderId;

  res.render("folder", { folder: folder, folderId: folderId, files: files });
};
