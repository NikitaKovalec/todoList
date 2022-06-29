const express = require('express')
const app = express()
const port = 3100
const tasks = []
id = 0
value = ''

app.use(express.json())

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const task = req.body
  task.value = value
  task.id = id + 1

  tasks.push(task)
  res.status(201)

})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})