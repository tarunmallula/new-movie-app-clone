import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const url =
    'https://res.cloudinary.com/dzcltcukw/image/upload/v1705060369/page-not-found-img.png'

  return (
    <div
      className="not-found-container"
      alt="not found"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '80vh',
      }}
    >
      <h1 className="not-found-title">Lost Your Way?</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found <br />
        Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
