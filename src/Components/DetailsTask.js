import React from "react";
import {Link, useParams} from "react-router-dom";

function DetailsTask({tasks}) {
	const taskId = useParams()
	const id = taskId.taskId
	const task = tasks.find(obj => obj.id.toString() === id)
	return<>
		<h3>Текст таска: {task.value}</h3>
		<Link to='/'><button>Назад</button></Link>
	</>
}

export default DetailsTask