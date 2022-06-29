const express = require('express')
const app = express()
const port = 3100
const tasks = []


app.use(express.json())

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  res.send(201)
  return req.body.value = 'ты лох';
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})