const prisma = require("../db/queries")
const { body, validationResult } = require("express-validator")
const cloudinary = require("../middleware/cloudinary")

//GET FOLDER FORM
exports.addFolderGet = (req, res) => {
  if (!req.user) {
    res.redirect("/")
  }
  res.render("add_folder")
}

const validateSignUp = [body("folderName").trim().notEmpty().withMessage("Folder name cannot be empty")]

//POST NEW FOLDER
exports.addFolderPost = async (req, res) => {
  const { folderName } = req.body
  const { id } = req.user
  await prisma.folder.create({
    data: {
      name: folderName,
      userId: id,
    },
  })
  res.redirect("/user")
}

//GET FOLDER INFO
exports.folderProfileGet = async (req, res) => {
  if (!req.user) {
    res.redirect("/")
  }
  const folder = await prisma.folder.findMany({
    where: {
      id: Number(req.params.folderId),
    },
  })
  const files = await prisma.file.findMany({
    where: {
      folderId: Number(req.params.folderId),
    },
  })
  const folderId = req.params.folderId

  res.render("folder", { folder: folder, folderId: folderId, files: files })
}

//GET FOLDER FORM TO UPDATE
exports.updateFolderGet = async (req, res) => {
  const user = await prisma.folder.findUnique({
    where: { id: Number(req.params.folderId) },
  })
  const folderId = req.params.folderId
  res.render("update_folder", { placeholder: user.name, folderId: folderId })
}

//POST UPDATED FORM
exports.updateFolderPost = async (req, res) => {
  const { folderName } = req.body
  await prisma.folder.update({
    where: { id: Number(req.params.folderId) },
    data: { name: folderName },
  })
  res.redirect(`/folder/${req.params.folderId}`)
}

//DELETE FOLDER
exports.deleteFolderPost = async (req, res) => {
  const folderFiles = await prisma.file.findMany({
    where: {
      folderId: Number(req.params.folderId),
    },
  })
  for (let i = 0; i < folderFiles.length; i++) {
    cloudinary.uploader.destroy(folderFiles[i].name)
  }
  await prisma.folder.delete({
    where: {
      id: Number(req.params.folderId),
    },
  })
  res.redirect("/user")
}
