<h1 align="center">File uploader</h1>

<p align="center">A back end cloud file uploader project that uses EJS for rendering from <a href="https://www.theodinproject.com/lessons/nodejs-file-uploader">Odin</a></p>

<h3>Demo: <a href="https://teenage-alanah-fede-org-6a2490a6.koyeb.app">File uploader</a></h3>

## Built with

- Node JS
- Express
- EJS
- Passport
- Prisma ORM
- Cloudinary
- Multer
- CSS

### Dependencies

- **@prisma/client**: auto-generated, type-safe query builder that provides an intuitive API for interacting with your database
- **@quixo3/prisma-session-store**: Express session store implementation that utilizes the Prisma Framework to persist session data in a database
- **bcrypt**: adaptive password-hashing function used to enhance security
- **cloudinary**: an API-first, cloud-based solution to manage images and videos for the web (will be added shortly)
- **cookie-parser**: makes it easy to read and manage cookies sent by the browser to the server.
- **dotenv**: tool that loads environment variables, often containing sensitive information from a .env file
- **ejs**: a server-side templating engine that generates dynamic HTML by embedding JavaScript code within the HTML files
- **express**: unopinionated web framework for Node.js. It simplifies the process of building server-side applications and APIs
- **express-session**: middleware that provides server-side session management for applications
- **express-validator**: simplifies server-side input validation and sanitization
- **moment**: library designed to simplify the parsing, validation, manipulation, and formatting of dates and times
  **multer**: library for handling file upload
- **passport**: that provides an extensible set of authentication strategies
- **passport-local**: authentication middleware using a username and password
- **superagent**: HTTP client library for JavaScript. It provides a fluent, chainable API for making HTTP requests and handling responses.

<br/><br/>

## Clone and start the project

Here is how you can start the project locally.

Prerequisites:

- Installed psql
- Installed npm
  <br/><br/>

**1. Clone the repo**

```
#SSH
$ git clone git@github.com:fedewulff/file_uploader.git
```

**2. Download dependencies**

```
$ cd file_uploader
$ npm i
```

**3. Create `.env` file inside project**

**4. Create postgresql database**

- `$ psql`
- 'CREATE DATABASE file_uploader;`

**5. Create Cloudinary account**

**6. Add the following to `.env` file**

```
NODE_ENV="development"
PORT=[XXXX]
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/file_uploader"
SESSION_SECRET= #create strong password
CLOUDINARY_CLOUD_NAME= #given by cloudinary
CLOUDINARY_API_KEY= #given by cloudinary
CLOUDINARY_API_SECRET= #given by cloudinary
```

**7. Start the project**

cd file_uploader `$ node --watch app.js `
