import React from 'react';
import '../styles/Search.css';
import { Button, TextField, Switch, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

/*  ------------------ SearchComponent -----------------------
    This is a SearchComponent that uses Material-UI components.
    ----------------------------------------------------------  */
const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'black',
      backgroundColor: 'white',
    },
  },
  input: {
    width: '300px',
  },
  button: {
    '&:active': {
      backgroundColor: 'purple',
    },
  },
});

/* ------------------ Toggle Switch -------------------------
                MUI THEME for the Toggle Switch
   ----------------------------------------------------------  */
const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

/*  ------------------ SearchComponent -----------------------
        This is the Main function for the SearchComponent.
    ----------------------------------------------------------  */
function SearchComponent() {
  const classes = useStyles();
  const [method, setMethod] = React.useState(false);

  const handleToggle = () => {
    setMethod(!method);
  };

/*  ------------------ SearchComponent HTML -----------------------
                  This is the main HTML for the page
    ---------------------------------------------------------------  */
  return (
    // ThemeProvider
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="switch-container">
          {/* MUI Switch */}
          <Switch checked={method} onChange={handleToggle} color="primary" />
          {/* Textfield for Searchbar */}
          <TextField
            label="Web Search"
            variant="outlined"
            className={`search-bar ${classes.root}`}
          />
        </div>
        {/* MUI Buttons */}
        <div className="buttons-container">
          <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`}>Web Search</Button>
          <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`}>Spiderfoot</Button>
          <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`}>Database</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SearchComponent;