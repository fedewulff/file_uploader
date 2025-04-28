const prisma = require("../db/queries");
const moment = require("moment");
const cloudinary = require("../middleware/cloudinary");

const request = require("superagent");

//GET FILE FORM
exports.addFileGet = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const folderId = req.params.folderId;
  res.render("add_file", { user: req.user, folderId: folderId || null });
};

//POST NEW FILE
exports.addFilePost = async (req, res) => {
  console.log(req.body);
  let todayDate = moment().format("l");
  const { id } = req.user;
  console.log(req.file);
  const uploadResult = await cloudinary.uploader.upload(req.file.path, {
    public_id: req.file.filename,
    resource_type: "auto",
  });
  console.log(uploadResult);

  function getNumberFromFolderId() {
    if (req.params.folderId) {
      return Number(req.params.folderId);
    } else return null;
  }

  await prisma.file.create({
    data: {
      name: req.file.filename,
      createdAt: todayDate,
      file: uploadResult.url,
      size: req.file.size,
      resourceType: uploadResult.resource_type,
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

//GET FILE INFO
exports.fileDataGet = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.fileId),
    },
  });
  console.log(file);
  res.render("file", { file: file });
};

//DOWNLOAD FILE
exports.fileDownloadGet = async (req, res) => {
  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.fileId),
    },
  });
  res.set("Content-disposition", "attachment; filename=" + file.name);
  request(file.file).pipe(res);
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
