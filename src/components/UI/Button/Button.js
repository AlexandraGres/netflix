import classes from './Button.module.scss'

const Button = ({type, disabled, onClick, children}) => {
  const cls = [classes.Button]

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button