const express = require('express')
const app = express()
const port = 3100
let arr = []

app.get('/tasks', (req, res) => {
  let obj = {
    value: "",
    id: 0
  }
  res.json([...arr, obj])
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})