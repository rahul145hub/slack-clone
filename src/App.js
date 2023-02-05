import React from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Chat from './components/Chat/Chat'

import './App.css'
import Login from './components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import { SET_USER } from './store/constants'

const App = () => {
    let user = useSelector((state) => state.userReducer.user);
    const disptach = useDispatch();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            disptach({ type: SET_USER, payload: user });
        }
    })

    if (user) {
        return (
            <div className='app'>
                <Header />
                <div className='app__body'>
                    <Sidebar />
                    <Routes>
                        <Route path='/room/:roomId' element={<Chat />} />
                    </Routes>
                </div>
            </div>
        )
    }

    return (
        <div className='app'>
            <Login />
        </div>
    )
}

export default App