const express = require('express')
const app = express()
const port = 3100
const tasks = []
id = 0

app.use(express.json())

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const task = req.body
  task.value = " Какой-то таск"
  task.id = id++

  tasks.push(task)
  res.status(201)
  res.send('ХУЕК')
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})