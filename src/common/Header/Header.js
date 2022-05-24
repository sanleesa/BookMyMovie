import React, { Fragment, useState } from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import {
  Button,
  Tabs,
  Tab,
  TextField
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { compose, spacing, palette } from '@material-ui/system';
import Modal from 'react-modal'

const Box = styled('div')(
  compose(
    spacing,
    palette,
  ),
)

function Header() {

  Modal.setAppElement("#root")

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [value, setValue] = useState(0)

  const [userName, setUserName] = useState({
    username: "",
    helperText: "",
    error: false
  })
  const [loginPassword, setLoginPassword] = useState({
    loginpassword: "",
    helperText: "",
    error: false
  })
  const [firstName, setFirstName] = useState({
    firstname: "",
    helperText: "",
    error: false
  })
  const [lastName, setLastName] = useState({
    lastname: "",
    helperText: "",
    error: false
  })
  const [email, setEmail] = useState({
    email: "",
    helperText: "",
    error: false
  })
  const [regsiterPassword, setRegsiterPassword] = useState({
    regsiterpass: "",
    helperText: "",
    error: false
  })
  const [contact, setContact] = useState({
    contact: "",
    helperText: "",
    error: false
  })
  const [registration, setRegistration] = useState(false)

  const modalStyles = {
    content: {
      inset: "50% auto auto 50%",
      transform: "translate(-50%,-50%)",
      maxWidth: "300px",
    },
  }


  const handleRegister = (event) => {
    event.preventDefault();
    setRegistration(true);
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    const userName = {
      username: "",
      helperText: "",
      error: false
    }
    const loginPassword = {
      loginpassword: "",
      helperText: "",
      error: false
    }
    const firstName = {
      firstname: "",
      helperText: "",
      error: false
    }
    const lastName = {
      lastname: "",
      helperText: "",
      error: false
    }
    const email = {
      email: "",
      helperText: "",
      error: false
    }
    const regsiterPassword = {
      regsiterpass: "",
      helperText: "",
      error: false
    }
    const contact = {
      contact: "",
      helperText: "",
      error: false
    }

    setUserName(userName)
    setLoginPassword(loginPassword)
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
    setRegsiterPassword(regsiterPassword)
    setContact(contact)
    setModalIsOpen(false)
  }

  const handleChange = (event, newValue) => {
    if (value === 0) {
      const userName = {
        username: "",
        helperText: "",
        error: false
      }
      const loginPassword = {
        loginpassword: "",
        helperText: "",
        error: false
      }
      setUserName(userName)
      setLoginPassword(loginPassword)
    }
    setValue(newValue)
  }

  const handleLogin = (event) => {
    event.preventDefault()

    // if (userName.username === "" || loginPassword.loginpassword === "") {
    //   userName["error"] = true
    //   loginPassword["error"] = true
    //   userName["helperText"] = "required";
    //   loginPassword["helperText"] = "required";
    //   console.log("Hi");
    //   console.log(userName, loginPassword)
    // }

    if (userName.error || loginPassword.error) {
      return
    }
    if (!userName.error && !loginPassword.error) {
      // const userPassword = localStorage.getItem(usernameObj.username)
      // if (userPassword === null) return
      // if (userPassword === loginPasswordObj.loginPassword) {
      //   setIsLoggedIn(true)
      //   closeModal()
      // }
      setIsLoggedIn(true)
      closeModal()
    }
  }

  const handleInputChange = (event, object, formLabel) => {
    const currentObject = { ...object }
    currentObject[formLabel] = event.target.value

    if (currentObject[formLabel] === "") {
      currentObject["error"] = true;
      currentObject["helperText"] = "required";
    }
    if (currentObject.error === true && currentObject[formLabel] !== "") {
      currentObject["error"] = false;
      currentObject["helperText"] = "";
    }

    switch (formLabel) {
      case "username":
        setUserName(currentObject)
        break
      case "loginpassword":
        setLoginPassword(currentObject)
        break
      case "firstname":
        setFirstName(currentObject)
        break
      case "lastname":
        setLastName(currentObject)
        break
      case "email":
        setEmail(currentObject)
        break
      case "regsiterpass":
        setRegsiterPassword(currentObject)
        break
      case "contact":
        setContact(currentObject)
        break
      default:
        break
    }
  }

  return (
    <Fragment>
      <div className='header-div'>
        <img src={logo} className="logo" alt="logo" />
        {
          isLoggedIn ?
            <Button variant="contained" className='header-btn' onClick={() => { setIsLoggedIn(false) }}>Logout</Button>
            :
            <Button variant="contained" className='header-btn' onClick={openModal}>Login</Button>
        }

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          {value === 0 && (
            <form
              noValidate
              style={{ textAlign: "center", padding: "1rem" }}
              onSubmit={handleLogin}>
              <TextField
                type="text"
                required
                label="Username"
                helperText={userName.helperText}
                value={userName.username}
                onChange={event => handleInputChange(event, userName, "username")}
                error={userName.error}
              />
              <TextField
                type="password"
                required
                label="Password"
                helperText={loginPassword.helperText}
                value={loginPassword.loginPassword}
                onChange={event => handleInputChange(event, loginPassword, "loginpassword")}
                error={loginPassword.error}
              />
              <Box style={{ marginTop: "1.5rem" }}>
                <Button variant="contained" color="primary" type="submit">
                  Login
                </Button>
              </Box>
            </form>
          )}
          {value === 1 && (
            <form
              noValidate
              style={{ textAlign: "center", padding: "1rem" }}
              onSubmit={handleRegister}>
              <TextField
                type="text"
                required
                label="First Name"
                variant="standard"
                helperText={firstName.helperText}
                value={firstName.firstname}
                onChange={event => handleInputChange(event, firstName, "firstname")}
                error={firstName.error}
              />
              <TextField
                type="text"
                required
                label="Last Name"
                variant="standard"
                helperText={lastName.helperText}
                value={lastName.lastname}
                onChange={event => handleInputChange(event, lastName, "lastname")}
                error={lastName.error}
              />
              <TextField
                type="email"
                required
                label="Email"
                variant="standard"
                helperText={email.helperText}
                value={email.email}
                onChange={event => handleInputChange(event, email, "email")}
                error={email.error}
              />
              <TextField
                type="password"
                required
                label="Password"
                variant="standard"
                helperText={regsiterPassword.helperText}
                value={regsiterPassword.registerpassword}
                onChange={event => handleInputChange(event, regsiterPassword, "registerpassword")}
                error={regsiterPassword.error}
              />
              <TextField
                type="password"
                required
                label="Contact"
                variant="standard"
                helperText={contact.helperText}
                value={contact.contact}
                onChange={event => handleInputChange(event, contact, "contact")}
                error={contact.error}
              />
              <Box style={{ marginTop: "1.5rem" }}>
                {registration && (
                  <div style={{ margin: "1rem 0" }}>
                    Registration Successful. Please Login!
                  </div>
                )}
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </Box>
            </form>
          )}
        </Modal>

      </div>
    </Fragment>
  )
}

export default Header
