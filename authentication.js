const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const prisma = require("./db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      console.log("password");
      console.log(password);

      if (!user) {
        console.log(1);
        return done(null, false, { message: "Username does not exist" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log(2);
        return done(null, false, { message: "Wrong password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  delete user.password;
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
