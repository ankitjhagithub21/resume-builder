require('dotenv').config()
const express = require('express')
const connectDB = require('./db/conn')
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})