const express = require('express')
const app = express()
const port = 3100

app.get('/', (req, res) => {
  res.send('Иди нахуй! Это приватный сервер')
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})