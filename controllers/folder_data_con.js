const prisma = require("../db/queries");

exports.folderProfileGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("folder", { files: [] });
};
