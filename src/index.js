import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import userReducer from './store/reducer';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux'
import './index.css';

const reducers = combineReducers({ userReducer })
const store = createStore(reducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider >
	</React.StrictMode>
);

