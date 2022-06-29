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
  const task = {}
  task.value = req.body.value
  task.id = id++

  if (task.value) {
    tasks.push(task)
    res.status(201)
    res.send('ХУЕК')
  }else {
    res.status(404).send('Поле value обязательно')
  }

  console.log(req.body)
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})