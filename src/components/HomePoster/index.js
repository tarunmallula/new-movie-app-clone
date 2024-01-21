import './index.css'

const HomePoster = props => {
  const {poster} = props
  const {posterPath, title, overview} = poster
  return (
    <div
      className="poster-container"
      alt={title}
      style={{
        backgroundImage: `url(${posterPath})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      <div className="content-container">
        <h1 className="content-title">{title}</h1>
        <p className="content-description">{overview}</p>
        <button className="play-button" type="button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePoster
