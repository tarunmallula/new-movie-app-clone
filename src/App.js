import {Component} from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import MovieContext from './context/MovieContext'

import './App.css'

class App extends Component {
  state = {
    username: '',
    password: '',
    searchInput: '',
  }

  updateUsername = value => {
    this.setState({username: value})
    // console.log(value)
  }

  updatePassword = value => {
    this.setState({password: value})
  }

  updateSearchInput = value => {
    this.setState({searchInput: value})
    // console.log(value)
  }

  onChangeLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password, searchInput} = this.state
    console.log(searchInput)
    return (
      <MovieContext.Provider
        value={{
          username,
          password,
          searchInput,
          updateUsername: this.updateUsername,
          updatePassword: this.updatePassword,
          updateSearchInput: this.updateSearchInput,
          onChangeLogout: this.onChangeLogout,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default withRouter(App)
