const express = require('express')
const app = express()
const port = 3100
let arr = []

app.get('/', (req, res) => {
  let obj = {
    value,
    id
  }
  res.send(JSON.stringify([...arr, obj]))
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})