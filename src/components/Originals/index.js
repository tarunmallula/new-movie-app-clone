import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Originals extends Component {
  state = {
    originalsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalList()
  }

  getOriginalList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/originals`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        originalsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="original-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  renderSuccessView = () => {
    const {originalsList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    return (
      <>
        <Slider {...settings}>
          {originalsList.map(each => (
            <Link to={`/movies/${each.id}`}>
              <li
                testid="MovieCard"
                className="react-slick-li-item"
                key={each.id}
              >
                <img
                  className="slick-movie-img"
                  src={each.posterPath}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </Slider>
      </>
    )
  }

  renderFailureView = () => (
    <div className="original-error-container">
      <img
        src=" https://res.cloudinary.com/dzcltcukw/image/upload/v1705060891/alert-triangle.png"
        alt="failure view"
        className="original-error-image"
      />
      <p className="original-error-title">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="original-error-button"
        onClick={this.getOriginalList}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginal = () => {
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
    return <div className="original-container">{this.renderOriginal()}</div>
  }
}

export default Originals
