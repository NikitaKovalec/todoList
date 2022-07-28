const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()
const port = 3100
app.use(cors())

const db = new sqlite3.Database('./taskList.db', (err) => {
    if (err) return console.log('Ошибка:', err)
    console.log('Успешно')
})

db.run(`CREATE TABLE tasks (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, value CHAR)`, (err) => {
    if (err) return console.error(err)
})

app.use(express.json())

app.get('/tasks/', async (req, res) => {
    const tasks = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM tasks`, [], (err, rows) => {
            if (err) reject(err)
            else resolve(rows)
        })
    })
    res.json(tasks)
})

app.post('/tasks/', async (req, res) => {
    if (req.body.value) {
        const {id, value} = req.body
        try {
            await new Promise((resolve, reject) => {
                db.run(`INSERT INTO tasks (id, value) VALUES (?,?)`, [id, value.toString()], (err) => {
                    if (err) reject(err)
                    else {
                        resolve(req.body)
                    }
                })
            })
            const lastTask = await new Promise((resolve, reject) => {
                db.get(`SELECT * FROM tasks ORDER BY id DESC LIMIT 1`, (err, rows) => {
                    if (err) reject(err)
                    else {
                        resolve(rows)
                    }
                })
            })
            res.json(lastTask)
        } catch (err) {
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }

    } else {
        res.status(400).send('Поле value обязательно')
    }
})

app.put('/tasks/:id/', async (req, res) => {
    if (req.body.value) {
        try {
            const newTaskDB = await new Promise((resolve, reject) => {
                db.run(`UPDATE tasks SET value = ? WHERE id = ?`, [req.body.value, req.params.id], (err) => {
                    if (err) reject(err)
                    else {
                        resolve(req.body)
                    }
                })
            })
            res.json(newTaskDB)
        } catch (err) {
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }
    } else {
        res.status(400).send('Поле value обязательно')
    }
})

app.delete('/tasks/:id/', async (req, res) => {
    if (req.params.id !== -1) {
        try {
            await new Promise((resolve, reject) => {
                db.run(`DELETE FROM tasks WHERE id = ?`, [req.params.id], (err) => {
                    if (err) reject(err)
                    else {
                        resolve('OK')
                    }
                })
            })
            res.json("OK")
        } catch (err) {
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }
    } else {
        res.status(404).send('Не найдено')
    }
})

// db.close()

app.listen(port, () => {
    console.log(`has been started on port ${port}...`)
})

