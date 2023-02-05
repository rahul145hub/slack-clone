import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import db from '../../../firebase/firebase';
import './SidebarOption.css';

const SidebarOption = ({ Icon, title, id, addChannelOption }) => {
	const navigate = useNavigate();

	const selectChannel = () => {
		if (id) {
			navigate(`/room/${id}`);
		} else {
			navigate(title)
		}
	}

	const addChannel = async () => {
		const channelName = prompt('Please enter the channel name');

		if (channelName) {
			const room = await addDoc(collection(db, "rooms"),{
				name: channelName
			});
		}
	}

	return (
		<div className='sidebarOption' onClick={addChannelOption ? addChannel : selectChannel}>
			{Icon && <Icon className='sidebarOption__icon' />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className='sidebarOption__channel'>
					<span className='sidebarOption__hash'>#</span>{title}
				</h3>
			)}
		</div>
	)
}

export default SidebarOption