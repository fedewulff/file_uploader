const prisma = require("../db/queries");

exports.userGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
  });
  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.render("user", { user: req.user, folders: folders, files: files });
};
