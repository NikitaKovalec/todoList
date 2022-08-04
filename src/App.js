import React from 'react';
import {Route, Routes} from "react-router-dom";
import TaskPage from "./Components/TaskPage";
import NotFound from "./Components/NotFound";
import TaskListPage from "./Components/TaskListPage";

function App() {
	return <>
		<Routes>
			<Route path={'ui/tasks/:taskId'} element={<TaskPage />}/>
			<Route path={'/'} element={<TaskListPage />}/>
			<Route path={'*'} element={<NotFound/>}/>
		</Routes>
	</>
}

export default App