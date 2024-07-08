const express = require('express')
const app = express()
const db = require('./db/connection')

const PORT = 3000

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT)
})

// db connection
db
  .authenticate()
  .then(() => {
    console.log('DB connected')
  })
  .catch(err => {
    console.log('Error on connecting the DB: ', err)
  })

// routes
app.get('/', (req, res) => {
  res.send('hello, world!')
})
