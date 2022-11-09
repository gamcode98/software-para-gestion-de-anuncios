const mongoose = require('mongoose')
const { dbUsername, dbPassword, dbHost, dbName } = require('.')

const connection = async function () {
  const conn = await mongoose.connect(
    process.env.MONGO_URL
  )

  console.log('Mongo DB connected: ', conn.connection.host)
}
module.exports = { connection, mongoose }
