import React, { useState, useEffect } from 'react';
import '../styles/Search.css';
import { Button, TextField, Switch, makeStyles, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import DataTable from './DataTable';

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
  activeButton: {
    backgroundColor: 'purple',
  },
});

const theme = createTheme({
  palette: {
    primary: purple,
  },
});

function SearchComponent() {
  const classes = useStyles();
  const [method, setMethod] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleToggle = () => {
    const newMethod = !method;
    setMethod(newMethod);

    if (newMethod) {
      // Perform web search with searchTerm
    } else {
      const filteredData = data.filter(item =>
        item.url.includes(searchTerm) || item.status.includes(searchTerm)
      );
      setData(filteredData);
    }
  };

  useEffect(() => {
    if (method) {
      const newFilteredData = data.filter(item =>
        Object.values(item).some(value =>
          value.toString().includes(searchTerm)
        )
      );
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data, method]);

  const handleDatabaseClick = () => {
    const databaseData = [
      { id: 1, url: 'http://example.com', status: '200 OK', responseTime: 120 },
      { id: 2, url: 'http://example2.com', status: '404 Not Found', responseTime: 200 },
    ];
    setData(databaseData);
    setShowData(prevShowData => !prevShowData);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ThemeProvider theme={theme}>
        <div className="container">
          <div className="switch-container">
            <Switch checked={method} onChange={handleToggle} color="primary" />
            <TextField
              label={method ? "Database Search" : "Web Search"}
              variant="outlined"
              className={`search-bar ${classes.root}`}
              onChange={handleSearchChange}
            />
          </div>
          <div className="buttons-container">
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`}>Web Search</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`} onClick={() => window.location.href = 'http://localhost:5001'}>Spiderfoot</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black ${showData ? classes.activeButton : ''}`} onClick={handleDatabaseClick}>Database</Button>
          </div>
        </div>
      </ThemeProvider>
      <div style={{ marginTop: '-400px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'auto', maxHeight: '500px' }}>
      {showData && <DataTable className="dataTable" data={filteredData} />}
      </div>
    </div>
  );
}

export default SearchComponent;