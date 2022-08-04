import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setLoadedTasks} from "../redux/action";

function TaskPage() {
	let [isLoading, setIsLoading] = useState(true)
	const params = useParams()
	const dispatch = useDispatch()
	let tasks = useSelector(state => state)
	const id = params.taskId

	const fetchTasks =  async () => {
		try {
			const result = fetch(`http://localhost:3100/tasks`, {
				mode: 'cors'
			})
			if (result.ok) {
				const data =  await result.json()
				dispatch(setLoadedTasks(data))
			}
		} catch (err) {
			console.log("Ошибка" + err)
		} finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchTasks()
	}, [])

	const findTask = tasks.find(obj => obj.id.toString() === id)
	console.log(tasks)

	return <>
		{isLoading ? <h3>'Загрузка данных... '</h3> : <h3>Текст таска: {findTask.value}</h3>}
		<Link to='/'>
			<button>Назад</button>
		</Link>
	</>
}

export default TaskPage