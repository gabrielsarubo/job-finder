const express = require('express')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')

const PORT = 3000

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT)
})

// body parser
app.use(bodyParser.urlencoded({ extended: false }))

// db connection
db
  .authenticate()
  .then(() => {
    console.log('DB connected')
  })
  .catch(err => {
    console.log('Error on connecting the DB: ', err)
  })

// jobs routes
app.use('/jobs', require('./routes/jobs'))
