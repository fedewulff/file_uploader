const prisma = require("../db/queries");
const cloudinary = require("cloudinary").v2;

//DELETE USER
exports.deleteUserPost = async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.user.id,
    },
  });
  res.redirect("/");
};

//DELETE FOLDER
exports.deleteFolderPost = async (req, res) => {
  const folderFiles = await prisma.file.findMany({
    where: {
      folderId: Number(req.params.folderId),
    },
  });
  for (let i = 0; i < folderFiles.length; i++) {
    cloudinary.uploader.destroy(folderFiles[i].name).then((result) => console.log(result));
  }
  await prisma.folder.delete({
    where: {
      id: Number(req.params.folderId),
    },
  });
  res.redirect("/user");
};

//DELETE FILE
exports.deleteFilePost = async (req, res) => {
  const deleteFile = await prisma.file.delete({
    where: {
      id: Number(req.params.fileId),
    },
  });
  cloudinary.uploader.destroy(deleteFile.name).then((result) => console.log(result));
  res.redirect("/user");
};
