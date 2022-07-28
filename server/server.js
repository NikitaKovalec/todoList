const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const port = 3100
app.use(cors())

const db = new sqlite3.Database('./taskList.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log('Ошибка')
    console.log('Успешно')
})

// db.run(`CREATE TABLE tasks(ID INTEGER PRIMARY KEY, value)`, (err) => {
//     if (err) return console.log('Ошибка')
//     console.log('Успешно')
// })

if (!fs.existsSync('nextTaskId.json')) {
    fs.writeFileSync('nextTaskId.json', '1')
}
if (!fs.existsSync('taskList.json')) {
    fs.writeFileSync('taskList.json', '[]')
}

let tasks = JSON.parse(fs.readFileSync('taskList.json', 'utf-8'))
let nextTaskId = JSON.parse(fs.readFileSync('nextTaskId.json', 'utf-8'))

app.use(express.json())

app.get('/tasks/', (req, res) => {
    async function getTasks() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM tasks`, [], (err, rows) => {
                if (err) reject(err)
                else {
                    resolve(rows)
                    res.json(tasks)
                    console.log('Успешно')
                }
            })
        })
    }
    getTasks().then(data=> data)
})

app.post('/tasks/', (req, res) => {
    if (req.body.value) {
        const task = {}
        task.value = req.body.value
        task.id = nextTaskId
        nextTaskId++
        let newTasks = [...tasks]

        try {
            newTasks.push(task)
            fs.writeFileSync('taskList.json', JSON.stringify(newTasks))
            tasks = newTasks
            fs.writeFileSync('nextTaskId.json', JSON.stringify(nextTaskId))
            async function postTask() {
                return new Promise((resolve, reject) => {
                    db.run(`INSERT INTO tasks (id, value) VALUES (?,?)`, [task.id, task.value.toString()], (err) => {
                        if (err) reject(err)
                        else {
                            res.json(task)
                            console.log('Успешно')
                        }
                    })
                })
            }
            postTask().then(data => data)
        } catch (err) {
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }

    } else {
        res.status(400).send('Поле value обязательно')
    }
})

app.put('/tasks/:id/', (req, res) => {
    const task = tasks.find(obj => obj.id.toString() === req.params.id)
    const index = tasks.findIndex(obj => obj.id.toString() === req.params.id)

    if (task) {
        if (req.body.value) {
            try {
                let newTask = {...task}
                let newTasks = [...tasks]
                newTask.value = req.body.value
                newTasks.splice(index, 1, newTask)
                fs.writeFileSync('taskList.json', JSON.stringify(newTasks))
                tasks = newTasks
                async function updateTask() {
                    return new Promise((resolve, reject) => {
                        db.run(`UPDATE tasks SET value = ? WHERE id = ?`, [index, newTask.value], (err) => {
                            if (err) reject(err)
                            else {
                                res.json(newTask)
                                console.log('Успешно')
                            }
                        })
                    })
                }
                updateTask().then(data=> data)
            } catch (err) {
                res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
            }
        } else {
            res.status(400).send('Поле value обязательно')
        }
    } else {
        res.status(404).send('Не найдено')
    }
})

app.delete('/tasks/:id/', (req, res) => {
    const index = tasks.findIndex(obj => obj.id.toString() === req.params.id)
    let newTasks = [...tasks]

    if (index !== -1) {
        try {
            newTasks.splice(index, 1)
            fs.writeFileSync('taskList.json', JSON.stringify(newTasks))
            tasks = newTasks
            res.status(200).send("OK")
            async function deleteTask() {
                return new Promise((resolve, reject) => {
                    db.run(`DELETE FROM tasks WHERE id = ?`, [index], (err) => {
                        if (err) reject(err)
                        else {console.log('Успешно')}
                    })
                })
            }
            deleteTask().then(data=> data)
        } catch (err) {
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }
    } else {
        res.status(404).send('Не найдено')
    }
})

app.listen(port, () => {
    console.log(`has been started on port ${port}...`)
})

