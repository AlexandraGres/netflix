import { NavLink } from 'react-router-dom'
import { HOME } from '../../common/constants/routes'
import classes from './NotFound.module.scss'

export const NotFound = () => {
   return (
     <div className={classes.NotFound}>
       <h1>404</h1>
       <h2>Page Not Found</h2>
       <NavLink to={HOME} exact>Back to Home</NavLink>
     </div>
   )
}