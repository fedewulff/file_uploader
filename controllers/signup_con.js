const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const prisma = require("../db/queries");
const CustomError = require("../errors/customError");

exports.signupGet = async (req, res) => {
  if (req.user) {
    res.redirect("/");
    return;
  }
  res.render("signup");
};

const validateSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .custom(async (username) => {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (user) {
        throw new Error("Username already in use");
      }
    }),

  ,
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password cannot be empty`)
    .isLength({ min: 8 })
    .withMessage(`Password has to be at least 8 characters long`),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`Confirmation password cannot be empty`)
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return value === req.body.password;
    })
    .isLength({ min: 8 })
    .withMessage(`Confirmation password has to be at least 8 characters long`),
];

exports.signupPost = [
  validateSignUp,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        for (let i = 0; i < errors.array().length; i++) {
          console.error(errors.array()[i].msg);
        }
        return res.status(400).render("signup", { errors: errors.array() });
      }

      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      res.redirect("/");
    } catch (e) {
      switch (e.code) {
        case "P2002":
          // handling duplicate key errors
          throw new CustomError(`Duplicate field value: ${e.meta.target}`, 400);
        case "P2014":
          // handling invalid id errors
          throw new CustomError(`Invalid ID: ${e.meta.target}`, 400);
        case "P2003":
          // handling invalid data errors
          throw new CustomError(`Invalid input data: ${e.meta.target}`, 400);
        default:
          // handling all other errors
          throw new CustomError(`Something went wrong: ${e.message}`, 500);
      }
    }
  },
];
