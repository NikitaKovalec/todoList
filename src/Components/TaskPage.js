import React from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

function TaskPage() {
	const params = useParams()
	const tasks = useSelector(state => state)
	const id = params.taskId

	const findTask = tasks.find(obj => obj.id.toString() === id)

	return<>
		<h3>Текст таска: {findTask.value}</h3>
		<Link to='/'><button>Назад</button></Link>
	</>
}

export default TaskPage