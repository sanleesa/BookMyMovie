import React, { Fragment } from 'react'
import './Header.css'
import logo from '../../assets/logo.svg';
import { Button } from '@material-ui/core';

function Header() {
  
  return (
    <Fragment>
      <div className='header-div'>
        <img src={logo} className="logo" alt="logo" />
        <Button variant="contained" className='header-btn'>Login</Button>
      </div>
    </Fragment>
  )
}

export default Header
