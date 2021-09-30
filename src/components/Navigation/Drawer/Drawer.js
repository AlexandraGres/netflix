import React from 'react';
import classes from './Drawer.module.scss'
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { connect, useSelector } from 'react-redux';
import { HOME, LOGIN, LOGOUT, MYLIST, PROFILE, SEARCH } from '../../../common/constants/routes';

const Drawer = ({onClose, isOpen}) => {

  const isAuthenticated = useSelector((state) => !!state.auth.token) 
    
  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            onClick={onClose}
            activeClassName={classes.active}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  const cls = [classes.Drawer]
    
  if (!isOpen) {
    cls.push(classes.close)
  }

  const links = [    
    { to: HOME, label: 'Home', exact: true },
    { to: SEARCH, label: 'Search', exact: true },
  ]

  if (isAuthenticated) {
    links.push({ to: PROFILE, label: 'Profile', exact: true })
    links.push({ to: MYLIST, label: 'My List', exact: true })
    links.push({ to: LOGOUT, label: 'Logout', exact: true })
  } else {
    links.push({ to: LOGIN, label: 'Login', exact: true })    
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {isOpen ? <Backdrop onClick={onClose} /> : null}
    </>
  )
}

export default connect()(Drawer);
