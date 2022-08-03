import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import tasksReducer from './redux/reducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from "redux";

const store = createStore(tasksReducer, composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
);

reportWebVitals();

