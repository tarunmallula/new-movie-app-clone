import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomePoster from '../HomePoster'
import Trending from '../Trending'
import Originals from '../Originals'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    randomPoster: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRandomPoster()
  }

  getRandomPoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const dataLength = data.results.length
      const poster = data.results[Math.floor(Math.random() * dataLength)]
      const updatedData = {
        id: poster.id,
        backdropPath: poster.backdrop_path,
        title: poster.title,
        overview: poster.overview,
        posterPath: poster.poster_path,
      }
      this.setState({
        randomPoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-container">
      <img
        src=" https://res.cloudinary.com/dzcltcukw/image/upload/v1705060891/alert-triangle.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-title">Something went wrong. Please try again</h1>
      <button
        type="button"
        className="error-button"
        onClick={this.getRandomPoster}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {randomPoster} = this.state
    return <HomePoster poster={randomPoster} />
  }

  renderViews = () => {
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
      <div className="home-container">
        <Header />
        <div className="movies-container">
          {this.renderViews()}
          <h1 className="home-heading">Trending Now</h1>
          <Trending />
          <h1 className="home-heading">Originals</h1>
          <Originals />
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
