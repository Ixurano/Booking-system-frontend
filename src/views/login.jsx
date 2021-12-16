import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';

const Login = ({ setTokens, setIsAuthenticated }) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    //console.log("logging in with " + username + " : " + password );

    fetch("https://wom21-cabin-service.herokuapp.com/auth", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password })
    })
      .then(
        (res) => {
          if (res.status === 202) {
            setIsAuthenticated(true);
            return res.json()
          } else {
            console.log("Login failed: " + res)
            setError(res.statusText);
          }
        }
      )
      .then(
        (result) => {
          setTokens(result);
        },
        (error) => {
          setError(error.message);
        }
      )
  }




  return (
    <div >

      <div className={classes.mainTitle}>Cabin Maintenance Services</div>
      <Paper elevation={3} className={classes.paper}>

        <form action="">
          <div className={classes.title}>Account Login</div>
          <div className={classes.textField}>
            <TextField
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>

          <div className={classes.textField}>
            <TextField
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </div>
        </form>
        <div className={classes.submit} >
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
      </Paper>
      <br />

      {error}


    </div>
  )
}
export default Login;


const useStyles = makeStyles({
  root: {
    padding: '0',
    margin: '0 auto',
    top: 0,
  },
  mainTitle: {
    color: 'white',
    fontSize: '2rem',
    marginTop: '8rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '3rem'
  },
  paper: {
    margin: '0 auto',
    marginTop: '4rem',
    width: '20rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  textField: {
    padding: '1rem',
  },
  submit: {
    paddingTop: '3rem',
  }
});