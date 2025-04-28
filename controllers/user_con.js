const prisma = require("../db/queries");
const cloudinary = require("../middleware/cloudinary");

//GET USER PROFILE
exports.userGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  console.log(req.session.passport);
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
  });
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: null,
    },
  });
  res.render("user", { user: req.user, folders: folders, files: files });
};

//DELETE USER
exports.deleteUserPost = async (req, res) => {
  const userFiles = await prisma.file.findMany({
    where: {
      userId: req.user.id,
    },
  });
  for (let i = 0; i < userFiles.length; i++) {
    cloudinary.uploader.destroy(userFiles[i].name).then((result) => console.log(result));
  }
  await prisma.user.delete({
    where: {
      id: req.user.id,
    },
  });
  res.redirect("/");
};
