const express = require('express')
const app = express()
const port = 3100
const tasks = []
const task = {}

app.use(express.json())

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  task.value = ''
  task.id = 0

  console.log(task)
  res.send(201)
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})