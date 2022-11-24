import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isShowPasswordChecked, deletePassword} = props
  const {websiteName, username, password, id} = passwordDetails
  const initial = websiteName ? websiteName[0].toUpperCase() : ''

  const onClickDeleteButton = () => {
    deletePassword(id)
  }

  return (
    <li className="password-details-container">
      <div className="initial-container">
        <h1 className="initial">{initial}</h1>
      </div>
      <div className="details-container">
        <p className="text">{websiteName}</p>
        <p className="text">{username}</p>
        {isShowPasswordChecked ? (
          <p className="text">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="stars-image"
            alt="stars"
          />
        )}
      </div>
      <div className="delete-container">
        <button type="button" className="button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
            onClick={onClickDeleteButton}
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
