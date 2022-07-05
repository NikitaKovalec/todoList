const express = require('express')
const app = express()
const fs = require('fs')
const port = 3100
let tasks = []
const stat = fs.statSync('taskList.json')

if (stat.size !== 0) {
  tasks = JSON.parse(fs.readFileSync('taskList.json', 'utf-8'))
}

id = 1

app.use(express.json())

app.get('/tasks/', (req, res) => {
  if (stat.size !== 0) {
    try {
      res.json(tasks)
    } catch (err) {
      console.log('Ошибка чтения', err)
    }
  } else {
    res.json(tasks)
  }
})

app.post('/tasks/', (req, res) => {
  if (req.body.value) {
    const task = {}
    if (stat.size !== 0) {
      try {
        task.value = req.body.value
        task.id = tasks[tasks.length - 1].id + 1

        tasks.push(task)
        res.json(task)

        fs.writeFileSync('taskList.json', JSON.stringify(tasks))
      } catch (err) {
        console.log('Ошибка записи', err)
      }
    } else {
      task.value = req.body.value
      task.id = id++

      tasks.push(task)
      res.json(task)

      fs.writeFileSync('taskList.json', JSON.stringify(tasks))
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

