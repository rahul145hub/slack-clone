import React from 'react'
import './Header.css';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useSelector } from 'react-redux';

const Header = () => {
  let user = useSelector((state) => state.userReducer.user); 

  return (
    <div className='header'>
      <div className="header__left">
        <Avatar className="avatar"  alt="Remy Sharp"  src={user.photoURL} />
        <AccessTimeIcon />
      </div>

      <div className="header__search">
        <SearchIcon />
        <input type="text" placeholder='search here...'/>
      </div>

      <div className="header__right">
        <HelpOutlineOutlinedIcon />
      </div>
    </div>
  )
}

export default Header