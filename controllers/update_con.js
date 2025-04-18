const prisma = require("../db/queries");

exports.updateFolderGet = async (req, res) => {
  const user = await prisma.folder.findUnique({
    where: { id: Number(req.params.folderId) },
  });
  const folderId = req.params.folderId;
  res.render("update_folder", { placeholder: user.name, folderId: folderId });
};

exports.updateFolderPost = async (req, res) => {
  const { folderName } = req.body;
  await prisma.folder.update({
    where: { id: Number(req.params.folderId) },
    data: { name: folderName },
  });
  res.redirect(`/folder/${req.params.folderId}`);
};
