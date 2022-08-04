import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function TaskPage() {
	const [tasks, setTasks] = useState([])
	const params = useParams()
	const id = params.taskId

	useEffect(() => {
		const result = fetch(`http://localhost:3100/tasks`, {
			mode: 'cors'
		})
		const data = result.json()
		setTasks(data)
	}, [])

	const findTask = tasks.find(obj => obj.id.toString() === id)

	return <>
		<h3>Текст таска: {findTask.value}</h3>
		<Link to='/'>
			<button>Назад</button>
		</Link>
	</>
}

export default TaskPage