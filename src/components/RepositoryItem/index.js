import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetails

  return (
    <>
      <li className="repo-card">
        <div className="avatar-container">
          <img src={avatarUrl} alt={name} className="avatar-url" />
          <h1 className="language-name">{name}</h1>
        </div>
        <div>
          <div className="icon-text">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              className="icon-image"
            />
            <p>{starsCount} stars</p>
          </div>
          <div className="icon-text">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="icon-image"
            />
            <p>{forksCount} forks</p>
          </div>
          <div className="icon-text">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="icon-image"
            />
            <p>{issuesCount} open issues</p>
          </div>
        </div>
      </li>
    </>
  )
}
export default RepositoryItem
