const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { port } = require('./config')
const { connection } = require('./config/db')

const ad = require('./routes/ad.routes')
const area = require('./routes/area.routes')

const app = express()
const person = require('./routes/person.routes')

connection()

app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:4200'],
    credentials: true
  })
)

person(app)
ad(app)
area(app)

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`)
})
