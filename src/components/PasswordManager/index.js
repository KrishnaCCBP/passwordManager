import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem/index'

import './index.css'

class PasswordManager extends Component {
  state = {
    username: '',
    websiteName: '',
    password: '',
    passwordDetailsList: [],
    searchInput: ' ',
    isShowPasswordChecked: false,
  }

  deletePassword = passwordId => {
    const {passwordDetailsList} = this.state

    this.setState({
      passwordDetailsList: passwordDetailsList.filter(
        password => password.id !== passwordId,
      ),
    })
  }

  renderPasswordDetailsList = () => {
    const {passwordDetailsList, searchInput} = this.state
    const searchResults = passwordDetailsList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return searchResults.map(eachPassword => (
      <PasswordItem
        key={eachPassword.id}
        passwordDetails={eachPassword}
        deletePassword={this.deletePassword}
        isShowPasswordChecked={this.isShowPasswordChecked}
      />
    ))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, password, websiteName} = this.state
    if (websiteName !== '' && username !== '' && password !== '') {
      const newPassword = {
        id: v4(),
        username,
        websiteName,
        password,
      }

      this.setState(prevState => ({
        passwordDetailsList: [...prevState.passwordDetailsList, newPassword],
        username: '',
        websiteName: '',
        password: '',
        searchInput: '',
      }))
    }
  }

  onChangePasswordInput = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUserNameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangeWebsiteNameInput = event => {
    this.setState({
      websiteName: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      isShowPasswordChecked: !prevState.isShowPasswordChecked,
    }))
  }

  renderPasswordDetailsEntryContainer = () => {
    const {username, websiteName, password} = this.state

    return (
      <div>
        <h1 className="password-heading">Add New Password</h1>
        <div className="password-inputs">
          <form className="form" onSubmit={this.onAddPassword}>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                value={websiteName}
                onChange={this.onChangeWebsiteNameInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Name"
                value={username}
                onChange={this.onChangeUserNameInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangeNameInput}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>
      </div>
    )
  }

  renderPasswordDetailsDisplayContainer = () => {
    const {passwordDetailsList} = this.state
    const length = passwordDetailsList.length()

    if (length === 0) {
      ;<img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password"
      />
    } else {
      this.renderPasswordDetailsList(passwordDetailsList)
    }
  }

  render() {
    const {passwordDetailsList, isShowPasswordChecked, searchInput} = this.state
    const length = passwordDetailsList.length()

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="upper-container">
          {this.renderPasswordDetailsEntryContainer}
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="lower-container">
          <div className="search-count-container">
            <div className="count-container">
              <h1 className="lower-container-heading">Your Passwords</h1>
              <p className="count">{length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
            <hr />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showPassword"
                className="input"
                value={isShowPasswordChecked}
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="showPassword" className="show-password-text">
                Show Password
              </label>
            </div>
            <div>{this.renderPasswordDetailsDisplayContainer()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
