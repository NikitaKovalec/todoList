const express = require('express')
const app = express()
const fs = require('fs')
const port = 3100

if (!fs.existsSync('nextTaskId.json')) {
  fs.writeFileSync('nextTaskId.json', '1')
}
if (!fs.existsSync('taskList.json')) {
  fs.writeFileSync('taskList.json', '[]')
}

let tasks = JSON.parse(fs.readFileSync('taskList.json', 'utf-8'))
let nextTaskId = JSON.parse(fs.readFileSync('nextTaskId.json', 'utf-8'))
let newTasks = [...tasks]

app.use(express.json())

app.get('/tasks/', (req, res) => {
  res.json(newTasks)
})

app.post('/tasks/', (req, res) => {
  if (req.body.value) {
    const task = {}

    task.value = req.body.value
    task.id = nextTaskId
    nextTaskId++

    try {
      newTasks.push(task)
      fs.writeFileSync('taskList.json', JSON.stringify(newTasks))
      fs.writeFileSync('nextTaskId.json', JSON.stringify(nextTaskId))
      res.json(task)
    } catch (err) {
      res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
    }

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
      fs.writeFileSync('taskList.json', JSON.stringify(tasks))
    } else {
      res.status(400).send('Поле value обязательно')
    }
  } else {
    res.status(404).send('Не найдено')
  }
})

app.delete('/tasks/:id/', (req, res) => {
  const index = tasks.findIndex(obj => obj.id.toString() === req.params.id)

  if (index !== -1) {
    tasks.splice(index, 1)
    fs.writeFileSync('taskList.json', JSON.stringify(tasks))
    res.status(200).send("OK")
  } else {
    res.status(404).send('Не найдено')
  }
})

app.listen(port, () => {
  console.log(`has been started on port ${port}...`)
})

