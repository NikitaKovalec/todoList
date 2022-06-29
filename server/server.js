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

  if (req.body.value) {
    const task = {}
    task.value = req.body.value
    task.id = id++
    tasks.push(task)
    res.status(201)
    res.send('ХУЕК')
  }else {
    res.status(400).send('Поле value обязательно')
  }
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})