import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const popularUrl = `https://apis.ccbp.in/movies-app/popular-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={48} width={48} />
    </div>
  )

  renderSuccessView = () => {
    const {popularList} = this.state
    return (
      <ul className="popular-list">
        {popularList.map(eachItem => (
          <Link to={`/movies/${eachItem.id}`} key={eachItem.id}>
            <li key={eachItem.id} className="popular-element">
              <img
                src={eachItem.posterPath}
                alt={eachItem.title}
                className="popular-image"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="popular-error-container">
      <img
        src="https://res.cloudinary.com/dzcltcukw/image/upload/v1705060468/loading-error-img.png"
        alt="failure view"
        className="popular-error-image"
      />
      <h1 className="popular-error-title">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        className="popular-error-button"
        onClick={this.getPopularList}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularViews = () => {
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
      <div className="popular-container">
        <Header />
        {this.renderPopularViews()}
        <Footer />
      </div>
    )
  }
}

export default Popular
