const { urlencoded } = require("express");
const prisma = require("../db/queries");

//GET
exports.addFileGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folderId = req.params.folderId;
  res.render("add_file", { user: req.user, folderId: folderId || null });
};

//POST
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./uploads");
  // },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e4);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
exports.upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addFilePost = async (req, res) => {
  const { id } = req.user;
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    public_id: req.file.filename,
  });
  function getNumberFromFolderId() {
    if (req.params.folderId) {
      return Number(req.params.folderId);
    } else return null;
  }
  await prisma.file.create({
    data: {
      name: req.file.filename,
      file: uploadResult.url,
      userId: id,
      folderId: getNumberFromFolderId(),
    },
  });
  if (req.params.folderId) {
    res.redirect(`/folder/${req.params.folderId}`);
    return;
  }
  res.redirect("/user");
};
