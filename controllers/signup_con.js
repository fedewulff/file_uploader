const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const prisma = require("../db/queries");

exports.signupGet = async (req, res) => {
  if (req.user) {
    res.redirect("/");
    return;
  }
  res.render("signup");
};

const validateSignUp = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty"),
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
  async (req, res) => {
    const errors = validationResult(req);
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
  },
];
