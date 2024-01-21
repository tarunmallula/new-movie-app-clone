import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    genres: [],
    similarMovies: [],
    spokenLanguages: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    adult: data.adult,
    backdropPath: data.backdrop_path,
    budget: data.budget,
    overview: data.overview,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const movieUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(movieUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.movie_details)
      const genresData = data.movie_details.genres.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
      }))
      const similarMoviesData = data.movie_details.similar_movies.map(
        eachSimilarMovie => ({
          backdropPath: eachSimilarMovie.backdrop_path,
          id: eachSimilarMovie.id,
          overview: eachSimilarMovie.overview,
          posterPath: eachSimilarMovie.poster_path,
          title: eachSimilarMovie.title,
        }),
      )
      const languagesData = data.movie_details.spoken_languages.map(
        eachLanguage => ({
          id: eachLanguage.id,
          englishName: eachLanguage.english_name,
        }),
      )
      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        similarMovies: similarMoviesData,
        spokenLanguages: languagesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="each-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={48} width={48} />
    </div>
  )

  renderFailureView = () => (
    <div className="movie-item-error-container">
      <img
        src="https://res.cloudinary.com/dzcltcukw/image/upload/v1705060468/loading-error-img.png"
        alt="failure view"
        className="movie-item-error-image"
      />
      <p className="movie-item-error-title">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="movie-item-error-button"
        onClick={this.getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, similarMovies, spokenLanguages} = this.state
    const hours = Math.floor(movieDetails.runtime / 60)
    const minutes = movieDetails.runtime % 60
    const movieDate = format(new Date(movieDetails.releaseDate), 'MM/dd/yyyy')
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = new Date(movieDate)
    const monthName = months[d.getMonth()]
    const date = new Date(movieDate)
    const year1 = date.getFullYear()
    const day1 = date.getDay().toString()
    let dateEndingWord
    if (day1.endsWith('1')) {
      dateEndingWord = 'st'
    } else if (day1.endsWith('2')) {
      dateEndingWord = 'nd'
    } else if (day1.endsWith('3')) {
      dateEndingWord = 'rd'
    } else {
      dateEndingWord = 'th'
    }

    return (
      <div
        className="movie-details-container"
        alt={movieDetails.title}
        style={{
          backgroundImage: `url(${movieDetails.backdropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '80vh',
        }}
      >
        <Header />
        <div className="movie-header">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <div className="runtime-container">
            <p className="movie-runtime">
              {hours}h {minutes}m
            </p>
            <p className="censor">{movieDetails.adult ? 'A' : 'U/A'}</p>
            <p className="movie-runtime">
              {new Date(movieDetails.releaseDate).getFullYear()}
            </p>
          </div>
          <p className="movie-overview">{movieDetails.overview}</p>
          <button type="button" className="movie-play-button">
            Play
          </button>
        </div>
        <div className="movie-middle">
          <div className="genres-audio-rating">
            <div className="genre-container">
              <h1 className="genre-heading">genres</h1>
              {genres.map(eachGenreItem => (
                <li key={eachGenreItem.id}>
                  <p className="each-genre">{eachGenreItem.name}</p>
                </li>
              ))}
            </div>
            <div className="genre-container">
              <h1 className="genre-heading">Audio Available</h1>
              {spokenLanguages.map(eachAudioItem => (
                <li key={eachAudioItem.id}>
                  <p className="each-genre">{eachAudioItem.englishName}</p>
                </li>
              ))}
            </div>
            <div className="genre-container">
              <h1 className="genre-heading">Rating Count</h1>
              <p className="each-genre">{movieDetails.voteCount}</p>
              <h1 className="genre-heading">Rating Average</h1>
              <p className="each-genre">{movieDetails.voteAverage}</p>
            </div>
            <div className="genre-container">
              <h1 className="genre-heading">Budget</h1>
              <p className="each-genre">{movieDetails.budget}</p>
              <h1 className="genre-heading">Release Date</h1>
              <p className="date-className">{movieDetails.releaseDate}</p>
              <p className="each-genre">
                {day1} {dateEndingWord} {monthName} {year1}
              </p>
            </div>
          </div>
          <div className="movie-down">
            <h1 className="movie-down-heading">More like this</h1>
            <ul className="similar-movie-list">
              {similarMovies.map(eachSimilarMovie => (
                <li key={eachSimilarMovie.id} className="similar-movie-element">
                  <img
                    src={eachSimilarMovie.posterPath}
                    alt={eachSimilarMovie.title}
                    className="similar-movie-image"
                  />
                </li>
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      </div>
    )
  }

  renderMovieDetailsView = () => {
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
    return <div>{this.renderMovieDetailsView()}</div>
  }
}

export default MovieItemDetails
