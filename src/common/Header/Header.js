import React, { Fragment, useState, useEffect } from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import {
  Button,
  Tabs,
  Tab,
  Box,
  TextField
} from '@material-ui/core'
import Modal from 'react-modal';
import Link from 'react-router-dom/Link';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const modalStyles = {
  content: {
    inset: "50% auto auto 50%",
    transform: "translate(-50%,-50%)",
    maxWidth: "300px",
  },
};

const useStyles = makeStyles(theme => ({
  loginButton: {
    marginLeft: theme.spacing(1),
  },
}));

function Header({ showBookNowButton, id }) {

  Modal.setAppElement("#root")
  const classes = useStyles();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState(0);

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
  const [registration, setRegistration] = useState(false);

  const registerUser = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(
        {
          "email_address": email.email,
          "first_name": firstName.firstname,
          "last_name": lastName.lastname,
          "password": regsiterPassword.regsiterpass,
          "mobile_number": contact.contact
        }
      )
    };
    const rawData = await fetch('http://localhost:8085/api/v1/signup', requestOptions);
    const response = await rawData.json();
    console.log(response);
    console.log({
      "email_address": email.email,
      "first_name": firstName.firstname,
      "last_name": lastName.lastname,
      "mobile_number": contact.contact,
      "password": regsiterPassword.regsiterpass
    })
  };

  const handleRegister = (event) => {
    event.preventDefault();
    registerUser();
    setRegistration(true);
    setModalIsOpen(false);
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
      };
      const loginPassword = {
        loginpassword: "",
        helperText: "",
        error: false
      };
      const firstName = {
        firstname: "",
        helperText: "",
        error: false
      };
      const lastName = {
        lastname: "",
        helperText: "",
        error: false
      };
      const email = {
        email: "",
        helperText: "",
        error: false
      };
      const regsiterPassword = {
        registerpass: "",
        helperText: "",
        error: false
      };
      const contact = {
        contact: "",
        helperText: "",
        error: false
      };
      setUserName(userName);
      setLoginPassword(loginPassword);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setRegsiterPassword(regsiterPassword);
      setContact(contact);
    }
    setValue(newValue)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (userName.error || loginPassword.error) {
      return
    }
    if (!userName.error && !loginPassword.error) {
      const { username, password } = { username: userName.username, password: loginPassword.loginpassword }
      const headers = {
        "authorization": `Basic ${window.btoa(username + ":" + password)}`,
        'Content-Type': 'application/json',
        'Cache-Control': "no-cache"
      }
      console.log(headers)
      await axios.post('http://localhost:8085/api/v1/auth/login/', {}, { headers }).then(response => {
        if (response.status === 200) {
          window.sessionStorage.setItem('user-details', JSON.stringify(response));
          window.sessionStorage.setItem('access-token', response.headers['access-token']);
          setIsLoggedIn(true);
          setModalIsOpen(false);
        }else {
          const error = new Error();
          error.message = response.message || 'Something went wrong.';
        }
        console.log(response)
      }).catch(error => {
        alert(error.message);
      })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      const accessToken = window.sessionStorage.getItem('access-token');

      fetch("http://localhost:8085/api/v1/auth/logout",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            authorization: `Bearer ${accessToken}`
          }
        }
      );

      window.sessionStorage.setItem('user-details', null);
      window.sessionStorage.setItem('access-token', null);

      setIsLoggedIn(false)

    } catch (error) {
      alert(`Error: ${error.message}`);
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

  // console.log(
  //   {
  //     "email_address": email.email,
  //     "first_name": firstName.firstname,
  //     "last_name": lastName.lastname,
  //     "mobile_number": contact.contact,
  //     "password": regsiterPassword.regsiterpass
  //   }
  // );

  return (
    <Fragment>
      <div className='header-div'>
        <img src={logo} className="logo" alt="logo" />
        {showBookNowButton && !isLoggedIn && (
          <Button variant="contained" color="primary">
            Book Show
          </Button>
        )}
        {showBookNowButton && isLoggedIn && (
          <Link to={`/bookshow/${id}`}>
            <Button variant="contained" color="primary">
              Book Show
            </Button>
          </Link>
        )}
        {
          isLoggedIn ?
            <Button variant="contained" className={classes.loginButton} onClick={handleLogout}>Logout</Button>
            :
            <Button variant="contained" className={classes.loginButton} onClick={openModal}>Login</Button>
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
                onChange={event => handleInputChange(event, regsiterPassword, "regsiterpass")}
                error={regsiterPassword.error}
              />
              <TextField
                type="text"
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
