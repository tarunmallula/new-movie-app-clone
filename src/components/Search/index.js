import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    showMenu: false,
    searchInput: '',
    searchMoviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchMovies()
  }

  getSearchMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.results.map(eachSearch => ({
        id: eachSearch.id,
        backdropPath: eachSearch.backdrop_path,
        overview: eachSearch.overview,
        posterPath: eachSearch.poster_path,
        title: eachSearch.title,
      }))
      this.setState({
        searchMoviesList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedList)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  searchHeader = () => {
    const {showMenu, searchInput} = this.state
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
            <li className="input-and-search-container">
              <input
                className="input"
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
                onClick={this.getSearchMovies}
              >
                <HiOutlineSearch />
              </button>
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

  renderLoadingView = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={48} width={48} />
    </div>
  )

  renderSuccessView = () => {
    const {searchMoviesList, searchInput} = this.state
    const searchResults = searchMoviesList.length > 0
    return searchResults ? (
      <ul className="search-list">
        {searchMoviesList.map(eachSearchItem => (
          <li key={eachSearchItem.id} className="search-item-element">
            <img
              src={eachSearchItem.backdropPath}
              alt={eachSearchItem.title}
              className="search-element-image"
            />
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-search-results">
        <img
          src="https://res.cloudinary.com/dzcltcukw/image/upload/v1705060186/no-search-results-png-img.png"
          alt="no movies"
          className="no-search-image"
        />
        <p className="no-search-text">
          Your search for {searchInput} did not find any matches
        </p>
      </div>
    )
  }

  renderSearchMoviesView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-container">
        {this.searchHeader()}
        {this.renderSearchMoviesView()}
      </div>
    )
  }
}

export default withRouter(Search)
