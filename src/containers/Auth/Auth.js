import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth';
import { NavLink } from 'react-router-dom';
import bg from '../../assets/img/login_page_bg.jpg'
import classes from './Auth.module.scss'

const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Auth = props => {

  const dispatch = useDispatch()

  const [isFormValid, setIsFormValid] = useState(false)
  const [formControls, setFormControls] = useState(
    {
      email: {
        value: '',
        type: 'email',
        errorMessage: 'Input valid email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        errorMessage: 'Input valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  )

  const loginHandler = () => {
    dispatch(
      auth(
      formControls.email.value,
      formControls.password.value,
      true
    )
  )}

  const registerHandler = () => {
    dispatch(
      auth(
        formControls.email.value,
        formControls.password.value,
        false
      )
    )}

  const submitHandler = event => {
    event.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControlsCopy = { ...formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControlsCopy[controlName] = control

    let isFormValid = true

    Object.keys(formControlsCopy).forEach(name => {
      isFormValid = formControlsCopy[name].valid && isFormValid
    })

    setFormControls(formControlsCopy)
    setIsFormValid(isFormValid)
  }

  return (
    <div className={classes.Auth}>
      <div className={classes.bg}>
        <img src={bg} alt="background" />
      </div>
      <div className={classes.form}>

      {props.match.url === '/login'
        ? <h1>Login</h1>
        : <h1>Register</h1>
      }
        
        <form onSubmit={submitHandler}>
          <Input
            type={formControls.email.type}
            value={formControls.email.value}
            valid={formControls.email.valid}
            touched={formControls.email.value}
            shouldValidate={!!formControls.email.validation}
            errorMessage={formControls.email.errorMessage}
            placeholder='Enter your email'
            onChange={event => onChangeHandler(event, formControls.email.type)}
          />
          <Input
            type={formControls.password.type}
            value={formControls.password.value}
            valid={formControls.password.valid}
            touched={formControls.password.value}
            shouldValidate={!!formControls.password.validation}
            errorMessage={formControls.password.errorMessage}
            onChange={event => onChangeHandler(event, formControls.password.type)}
            placeholder='Enter your password'
          />

          {props.match.url === '/login'
            ? <>
              <Button
                onClick={loginHandler}
                disabled={!isFormValid}
              > Login
              </Button>
              <p className={classes.message}>If you don't have account, <NavLink to="/signUp" exact>click here</NavLink></p>
            </>
            : <Button
              onClick={registerHandler}
              disabled={!isFormValid}
            > Create Account
            </Button>
          }
        </form>
      </div>
    </div>
  )
}

export default connect()(Auth);