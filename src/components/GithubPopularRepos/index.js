import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    popularReposList: [],
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getLanguages()
  }

  getLanguages = async () => {
    const {activeLanguageId} = this.state

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatePopularRepos = data.popular_repos
      const updateFetchedData = updatePopularRepos.map(eachLanguage => ({
        avatarUrl: eachLanguage.avatar_url,
        forksCount: eachLanguage.forks_count,
        id: eachLanguage.id,
        issuesCount: eachLanguage.issues_count,
        name: eachLanguage.name,
        starsCount: eachLanguage.stars_count,
      }))
      this.setState({
        popularReposList: updateFetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  activeLanguageButton = id => {
    this.setState(
      {activeLanguageId: id, apiStatus: apiStatusConstants.inProgress},
      this.getLanguages,
    )
  }

  renderLanguageButtons = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="language-buttons-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageDetails={eachLanguage}
            key={eachLanguage.id}
            updateActiveLanguage={this.activeLanguageButton}
            isActive={eachLanguage.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderLoadingContainer = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </>
  )

  renderPopularRepos = () => {
    const {popularReposList} = this.state

    return (
      <>
        <ul className="repos-list">
          {popularReposList.map(eachRepo => (
            <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
          ))}
        </ul>
      </>
    )
  }

  renderPopularReposList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularRepos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="gpr-container">
        <h1 className="popular-heading">Popular</h1>
        {this.renderLanguageButtons()}
        {this.renderPopularReposList()}
      </div>
    )
  }
}
export default GithubPopularRepos
