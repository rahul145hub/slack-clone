import { Button } from '@mui/material';
import React from 'react'
import { auth, provider } from '../../firebase/firebase'
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { SET_USER } from '../../store/constants';


const Login = () => {
    const dispatch = useDispatch()

    const signIn = async () => {
        try {
            let loginUser = await signInWithPopup(auth, provider);
            dispatch({type:SET_USER, payload: loginUser.user });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://yt3.googleusercontent.com/ytc/AL5GRJUyNSclWVdzjF267_EFUDHth4IXcUlcQCjEfNTvSw=s900-c-k-c0x00ffffff-no-rj' alt=''/>
                <h1>Sigin to slack-clone</h1>
                <p>bhatiarahul145@gmail.com</p>
                <Button variant="contained" color="success" onClick={() => signIn()}>Sigin with Google</Button>
            </div>
        </div>
    )
}

export default Login

