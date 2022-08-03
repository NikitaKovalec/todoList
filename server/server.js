const express = require('express')
const app = express()
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('tasksList', 'postgres', 'postgres',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
})
const port = 3100

const Task = sequelize.define('Task', {
    value: DataTypes.STRING,
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    tableName: 'tasks'
})

Task.sync()
    .then(() => {
        console.log('Подключено')
    })
    .catch((err) => {
        console.log('Ошибка' + err.message);
    })

app.use(cors())
app.use(express.json())

app.get('/tasks/', async (req, res) => {
    try {
        const tasks = await Task.findAll({order: [['id']]})
        res.json(tasks)
    } catch (err) {
        await console.log('Ошибка ' + err)
    }
})

app.post('/tasks/', async (req, res) => {
    if (req.body.value) {
        try {
            const task = await Task.create(req.body)
            res.json(task)
        } catch (err) {
            await console.log(err.message)
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }

    } else {
        res.status(400).send('Поле value обязательно')
    }
})

app.put('/tasks/:id/', async (req, res) => {
    if (req.body.value) {
        try {
            const newTask = await Task.update({value: req.body.value}, {where: {id: req.params.id}})
            res.json(newTask)
        } catch (err) {
            await console.log('Ошибка ' + err)
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }
    } else {
        res.status(400).send('Поле value обязательно')
    }
})

app.delete('/tasks/:id/', async (req, res) => {
    if (req.params.id !== -1) {
        try {
            await Task.destroy({where: {id: req.params.id} })
            res.json("OK")
        } catch (err) {
            await console.log('Ошибка ' + err)
            res.status(500).send('Непредвиденная ошибка. Попробуйте позже')
        }
    } else {
        res.status(404).send('Не найдено')
    }
})

app.listen(port, () => {
    console.log(`has been started on port ${port}...`)
})

