import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import SidebarOption from './SidebarOption/SidebarOption';
import { Inbox, InsertComment, FiberManualRecord, Create, Drafts, BookmarkBorder, PeopleAlt, FileCopy, ExpandLess, ExpandMore, Add, Apps } from '@mui/icons-material';
import db, { } from './../../firebase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    let user = useSelector((state) => state.userReducer.user); 
    const [channels, setChannels] = useState([]);

    console.log(user);

    useEffect(() => {
        onSnapshot(collection(db, "rooms"), (docs) => {
            let channelData = []
            docs.forEach(doc => {
                channelData.push({
                    id: doc.id,
                    name: doc.data().name
                })
            })
            setChannels(channelData)
        });
    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <div className='sidebar__info'>
                    <h2>Programmer</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </div>
                <Create />
            </div>
            <SidebarOption Icon={InsertComment} title='Threads' />
            <SidebarOption Icon={Inbox} title='Mention and Reactions' />
            <SidebarOption Icon={Drafts} title='Saved Items' />
            <SidebarOption Icon={BookmarkBorder} title='Channel browser' />
            <SidebarOption Icon={PeopleAlt} title='People and user groups' />
            <SidebarOption Icon={Apps} title='Apps' />
            <SidebarOption Icon={FileCopy} title='File Browser' />
            <SidebarOption Icon={ExpandLess} title='Show less' />
            <hr />
            <SidebarOption Icon={ExpandMore} title='Channels' />
            <hr />
            <SidebarOption Icon={Add} title='Add Channel' addChannelOption />

            {channels.map((channel) => (
                <SidebarOption title={channel.name} key={channel.id} id={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar