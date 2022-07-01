const express = require('express')
const app = express()
const port = 3100
const tasks = []

id = 1

app.use(express.json())

app.get('/tasks/', (req, res) => {
  res.json(tasks)
})

app.post('/tasks/', (req, res) => {
  if (req.body.value) {
    const task = {}
    task.value = req.body.value
    task.id = id++

    tasks.push(task)
    res.status(201)

    res.json(task)
  } else {
    res.status(400).send('Поле value обязательно')
  }
})

app.put('/tasks/:id/', (req, res) => {
  const task = tasks.find(obj => obj.id.toString() === req.params.id)

  if (task) {
    if (req.body.value) {
      task.value = req.body.value

      res.json(task)
    }else {
      res.status(400).send('Поле value обязательно')
    }
  } else {
    res.status(404).send('Не найдено')
  }
})

app.delete('/tasks/:id/', (req, res) => {
  const index = tasks.findIndex(obj => obj.id.toString() === req.params.id)

  if (!index) {
    tasks.splice(index, 1)
    res.status(200).send("OK")
  } else {
    res.status(404).send('Не найдено')
  }
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})