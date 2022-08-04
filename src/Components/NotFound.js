import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
	return <>
		<h1>Не найдено</h1>
		<Link to='/'><button>Назад</button></Link>
	</>
}

export default NotFound;