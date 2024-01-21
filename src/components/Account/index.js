import MovieContext from '../../context/MovieContext'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = () => (
  <MovieContext.Consumer>
    {value => {
      const {username, password, onChangeLogout} = value
      const onClickLogout = () => {
        onChangeLogout()
      }
      const hiddenPassword = '*'.repeat(password.length)
      return (
        <div className="account-container">
          <Header />
          <div className="user-details-container">
            <h1 className="account-title">Account</h1>
            <hr className="border" />
            <p className="user-name">
              Member ship{' '}
              <span className="user-email">{username}@gmail.com</span>
            </p>
            <p className="mask-password">Password: {hiddenPassword}</p>
            <hr className="border" />
            <div className="align-container">
              <p className="user-name">Plan details</p>
              <div className="ultra-container">
                <p className="premium">Premium</p>
                <p className="ultra">Ultra HD</p>
              </div>
            </div>
            <hr className="border" />
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
          <Footer />
        </div>
      )
    }}
  </MovieContext.Consumer>
)

export default Account
