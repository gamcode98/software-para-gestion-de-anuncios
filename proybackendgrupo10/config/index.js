require('dotenv').config()

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  nodemailerSecret: process.env.NODEMAILER_SECRET,
  emailToNodemailer: process.env.EMAIL_TO_NODEMAILER
}

module.exports = config
