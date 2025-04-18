const prisma = require("../db/queries");

exports.fileDataGet = async (req, res) => {
  const file = await prisma.file.findMany({
    where: {
      id: Number(req.params.fileId),
    },
  });
  console.log(file);
  res.render("file", { file: file });
};
