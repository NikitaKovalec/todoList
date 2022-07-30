const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'taskList',
})
const port = 3100
client.connect()

app.use(cors())
app.use(express.json())

client.query(`CREATE TABLE tasks (id SERIAL PRIMARY KEY , value VARCHAR(255))`, (err) =>{
    if (err) return console.log('Ошибка ' + err)
    console.log('Успешно')
})

app.get('/tasks/', async (req, res) => {
    const tasks = await client.query(`SELECT * FROM tasks`)
    res.json(tasks.rows)
})

app.post('/tasks/', async (req, res) => {
    if (req.body.value) {
        const {value} = req.body
        try {
            await client.query(`INSERT INTO tasks (value) VALUES ($1)`, [value.toString()], (err) => {
                if (err) console.log(err.message)
            })
            const lastTask = await client.query(`SELECT * FROM tasks ORDER BY id DESC LIMIT 1`)
            res.json(lastTask.rows[0])
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
            const newTask = await client.query(`UPDATE tasks SET value = $1 WHERE id = $2`, [req.body.value, req.params.id])
            res.json(newTask)
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
            await client.query(`DELETE FROM tasks WHERE id = $1`, [req.params.id])
            res.json("OK")
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

