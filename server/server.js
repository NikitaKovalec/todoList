const express = require('express')
const app = express()
const port = 3100
const tasks = []
const task = {}
const newTask = {}

id = 0

app.use(express.json())

app.get('/tasks/', (req, res) => {
  res.json(tasks)
  console.log(req.params.id)
})

app.post('/tasks', (req, res) => {
  if (req.body.value) {
    task.value = req.body.value
    task.id = id++

    tasks.push(task)
    res.status(201)

    res.send(JSON.stringify(task))
  } else {
    res.status(400).send('Поле value обязательно')
  }
})

app.put('/tasks/:id/', (req, res) => {
  req.params.id = task.id

  task.id = newTask.id
  task.value = newTask.value
  res.send(JSON.stringify(task))
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})