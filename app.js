const express = require("express");
const app = express();
const mainRoute = require("./routes/main_route");
require("dotenv").config();

const passport = require("passport");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const prisma = require("./db/queries");

const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("view engine", "ejs");

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoute);

app.use((err, req, res, next) => {
  console.error("err", err);
  console.error("message", err.message);
  res.status(err.statusCode || 500).send(err.message || "Internal server error");
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
