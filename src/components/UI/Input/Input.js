import classes from './Input.module.scss'

const isInvalid = ({ valid, touched, shouldValidate }) => {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const inputType = props.type || 'text'
  const cls = [classes.Input]

  return (
    <div className={cls.join(' ')}>
      {
        isInvalid(props)
          ? <p className={classes.error}>{props.errorMessage || 'Enter valid data'}</p>
          : null
      }
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={inputType}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />      
    </div>
  )
}

export default Input