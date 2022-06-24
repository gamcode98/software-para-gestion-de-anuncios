const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { port } = require('./config')
const { connection } = require('./config/db')

const app = express()

connection()

app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
)

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
