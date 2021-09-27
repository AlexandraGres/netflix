import classes from './Layout.module.scss'
import { useCallback, useState } from 'react'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.svg'
import { HOME } from '../../common/constants/routes'

const Layout = (props) => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenuHandler = useCallback(() => setShowMenu(!showMenu), [showMenu])

  const menuCloseHandler = useCallback(() => setShowMenu(false), [])

  return (
    <div className={classes.Layout}>

      <NavLink to={HOME} className={classes.logo}>
        <img src={logo} alt="logo" />
      </NavLink>

      <Drawer
        isOpen={showMenu}
        onClose={menuCloseHandler}
        isAuthenticated={props.isAuthenticated}
      />

      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={showMenu}
      />

      <main>
        <div className={classes.container}>
          {props.children}
        </div>
      </main>
    </div>
  )
}

export default Layout