import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
import { query, orderBy, limit , doc, onSnapshot, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase/firebase';
import './Chat.css';
import ChatInput from './ChatInput/ChatInput';
import Message from './Message/Message';

const Chat = () => {

    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);


    useEffect(()=>{
        if(roomId) {
            onSnapshot(doc(db, "rooms", roomId), (doc)=>{
                setRoomDetails(doc.data())
            })
        }

        const q = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp"));
        onSnapshot(q, (docs)=>{
            let roomMessagesData = []
            docs.forEach((doc)=> {
                roomMessagesData.push({
                    id: doc.id,
                    data: doc.data() 
                })
            })
            setRoomMessages(roomMessagesData)
        })
    }, [roomId])

    return (
        <div className='chat'>
            <div className='chat__header'>
                <div className='chat__headerLeft'>
                    <h4 className='chat__channelName'>
                        <strong>#{roomDetails?.name}</strong>
                        <StarBorderOutlined />
                    </h4>
                </div>

                <div className='chat__headerRight'>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>

            <div className='chat__messages'>
                {roomMessages.map(({id, data}) => (
                    <Message key={id}
                        message={data.message}
                        timestamp={data.timestamp}
                        user={data.user}
                        userId={data.userId}
                        userImage={data.userImage}
                    />
                ))}
            </div>

            <ChatInput channelName={roomDetails?.name} channelId={roomId}/>
        </div>
    )
}

export default Chat


