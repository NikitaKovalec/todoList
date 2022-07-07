const express = require('express')
const app = express()
const fs = require('fs')
const port = 3100
let tasks = []
const stat = fs.statSync('taskList.json')

if (!fs.existsSync('taskId.json')) {
  fs.writeFileSync('taskId.json', '0')
}

if (stat.size !== 0) {
  try {
    tasks = JSON.parse(fs.readFileSync('taskList.json', 'utf-8'))
  } catch (err) {
    console.log('Ошибка чтения', err)
  }
}

let newId = JSON.parse(fs.readFileSync('taskId.json', 'utf-8'))

if (newId !== 0) {
  id = newId + 1
} else {
  id = 1
}

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
    res.json(task)
    try {
      fs.writeFileSync('taskList.json', JSON.stringify(tasks))
      fs.writeFileSync('taskId.json', JSON.stringify(task.id))
    } catch (err) {
      console.log('Ошибка записи', err)
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

