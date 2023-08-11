import './index.css'

const languageFiltersData = props => {
  const {languageDetails, updateActiveLanguage, isActive} = props
  const {id, language} = languageDetails

  const onClickLanguageButton = () => {
    updateActiveLanguage(id)
  }
  const className = isActive ? 'active-button-border' : ''

  return (
    <li>
      <button
        type="button"
        className={`button ${className}`}
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}
export default languageFiltersData
