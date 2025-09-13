const { PrismaClient } = require("../src/generated/prisma")

const databaseUrl = process.env.DATABASE_URL

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
})

module.exports = prisma
