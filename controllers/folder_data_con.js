const prisma = require("../db/queries");

exports.folderProfileGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folderId = req.params.folderId;
  res.render("folder", { folderId: folderId, files: [] });
};
