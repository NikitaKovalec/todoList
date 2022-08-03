import React from "react";
import {Link} from "react-router-dom";

function DetailsTask({value}) {
	return<>
		<h3>Текст таска: {value}</h3>
		<Link to='/'><button>Назад</button></Link>
	</>
}

export default DetailsTask