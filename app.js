require("dotenv").config()

// if (process.env.NODE_ENV !== "development") {
//   console.log(1)
// }

const express = require("express")
const app = express()
const mainRoute = require("./routes/main_route")
const cloudinary = require("cloudinary").v2 /*FOR UPLOADING FILES*/
var flash = require("connect-flash")
const cookieParser = require("cookie-parser") /*FOR READING COOKIES*/

const passport = require("passport")
const expressSession = require("express-session")
//const flash = require("express-flash");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store")

const prisma = require("./db/queries")

const path = require("node:path") /*FOR CSS IN EJS*/
const assetsPath = path.join(__dirname, "public") /*FOR CSS  IN EJS*/
app.use(express.static(assetsPath)) /*FOR CSS*/

app.set("view engine", "ejs") /*FOR EJS*/

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
)
app.use(flash())

app.use(cookieParser())

app.use(passport.session())

app.use(express.urlencoded({ extended: true }))

app.use("/", mainRoute)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).send(err.message || "Internal server error")
})

const PORT = process.env.PORT || 2000
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`))
