import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassName
    let popularClassName
    let accountClassName

    switch (path) {
      case '/popular':
        popularClassName = 'active'
        break
      case '/profile':
        accountClassName = 'active'
        break
      default:
        homeClassName = 'active'
        break
    }

    return (
      <div className="header-container">
        <nav className="nav-container">
          <ul className="logo-and-headings">
            <Link to="/" className="link-element">
              <img
                src=" https://res.cloudinary.com/dzcltcukw/image/upload/v1705059688/movie-logo-img.png"
                alt="website logo"
                className="nav-logo"
              />
            </Link>
            <Link to="/" className="link-element">
              <h1 className={`nav-heading ${homeClassName}`}>Home</h1>
            </Link>
            <Link to="/popular" className="link-element">
              <h1 className={`nav-heading ${popularClassName}`}>Popular</h1>
            </Link>
          </ul>
          <ul className="list-container">
            <li>
              <Link to="/search" className="link-element">
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                >
                  <HiOutlineSearch size={24} />
                </button>
              </Link>
            </li>
            <li onClick={this.onClickShowMenu}>
              <button type="button" className="burger-button">
                <MdMenuOpen size={24} />
              </button>
            </li>
            <li>
              <Link to="/account" className="link-element">
                <img
                  src="https://res.cloudinary.com/dzcltcukw/image/upload/v1705060584/avatar-img.png"
                  alt="profile"
                  className="avatar-image"
                />
              </Link>
            </li>
          </ul>
        </nav>
        {showMenu && (
          <div className="menu-container">
            <ul className="menu-list">
              <li className={`list-item ${homeClassName}`}>
                <Link to="/" className="link-element">
                  Home
                </Link>
              </li>
              <li className={`list-item ${popularClassName}`}>
                <Link to="/popular" className="link-element">
                  Popular
                </Link>
              </li>
              <li className={`list-item ${accountClassName}`}>
                <Link to="/account" className="link-element">
                  Account
                </Link>
              </li>
              <li className="menu-icon" onClick={this.onClickHideMenu}>
                <button type="button">
                  <ImCross size={10} />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
