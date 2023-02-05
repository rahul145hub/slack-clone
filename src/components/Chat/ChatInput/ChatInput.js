import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import './ChatInput.css';
import db from '../../../firebase/firebase';
import { useSelector } from 'react-redux';


const ChatInput = ({ channelName, channelId }) => {
    let user = useSelector((state) => state.userReducer.user);
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        
        if(channelId) {
            setInput('');
            const message = await addDoc(collection(db, `rooms/${channelId}/messages`),{
                message: input,
                timestamp: serverTimestamp(),
                user: user?.displayName,
                userEmail: user?.email,
                userImage: user?.photoURL
            });
        }
    }


    return (
        <div className='chatInput'>
            <form>
                <input placeholder={`Message #${channelName}`} value={input} onChange={(e)=>setInput(e.target.value)} />
                <button type='submit' onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput