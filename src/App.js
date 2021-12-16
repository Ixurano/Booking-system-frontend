import './App.css';
import Login from './views/login';
import Browse from './views/browse';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [tokens, setTokens] = React.useState({});

  // tokens  = { "token": "eyJhbGc...",  "refreshToken": "eyJhbGc..."}  

  // React.useEffect(() => {
  //   console.log(tokens);
  // }, [tokens]);


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {isAuthenticated && tokens ?  
          <Browse tokens={tokens}/> 
          : 
          <Login 
            setTokens={setTokens} 
            setIsAuthenticated={setIsAuthenticated}
          />
        }
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#58a7af',
      contrastText: '#ffffff'
    },
  },
});

export default App;
