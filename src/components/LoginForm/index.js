import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'

import './index.css'

class LoginForm extends Component {
  state = {
    showSubmitError: false,
    errorMsg: '',
  }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {username, password, updateUsername, updatePassword} = value

          const onChangeUsername = event => {
            updateUsername(event.target.value)
          }

          const onChangePassword = event => {
            updatePassword(event.target.value)
          }

          const onSubmitSuccess = jwtToken => {
            const {history} = this.props
            Cookies.set('jwt_token', jwtToken, {
              expires: 30,
            })
            history.replace('/')
          }

          const onSubmitFailure = errorMsg => {
            this.setState({showSubmitError: true, errorMsg})
          }

          const submitForm = async event => {
            event.preventDefault()
            const userDetails = {username, password}
            const url = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',
              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok === true) {
              onSubmitSuccess(data.jwt_token)
            } else {
              onSubmitFailure(data.error_msg)
            }
          }

          const {showSubmitError, errorMsg} = this.state

          const jwtToken = Cookies.get('jwt_token')

          if (jwtToken !== undefined) {
            return <Redirect to="/" />
          }

          return (
            <div className="bg-container">
              <img
                src=" https://res.cloudinary.com/dzcltcukw/image/upload/v1705059688/movie-logo-img.png"
                alt="login website logo"
                className="movie-logo"
              />
              <form className="form-container" onSubmit={submitForm}>
                <h1 className="heading">Login</h1>
                <label htmlFor="name" className="label">
                  USERNAME
                </label>
                <input
                  id="name"
                  className="input"
                  type="text"
                  placeholder="rahul"
                  value={username}
                  onChange={onChangeUsername}
                />
                <label htmlFor="password" className="label">
                  PASSWORD
                </label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="************"
                  value={password}
                  onChange={onChangePassword}
                />
                {showSubmitError && <p className="error-msg">{errorMsg}</p>}
                <button className="button1" type="submit">
                  Sign in
                </button>
                <button className="button2" type="submit">
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default LoginForm
