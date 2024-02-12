import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField, Switch, makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import DataTable from './DataTable';
import CSVUploadComponent from './CSVUploadComponent';
import '../styles/fonts.css';
import axios from 'axios';

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
      width: '900px',
    },
  },
  input: {
    width: '300px',
  },
  button: {
    marginTop: '10px',
    margin: '5px',
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
  const [searchResults, setSearchResults] = useState(null);
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleWebSearch = async () => {
    setIsLoading(true);
    setSearchButtonPressed(true);
    if (!searchTerm) {
      alert('You must enter a URL to perform a search.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/url', {
        url: searchTerm
      });

      setSearchResults({
        data: response.data.result.rows[0].data,
        created_at: response.data.result.rows[0].created_at,
        updated_at: response.data.result.rows[0].updated_at
      });
    } catch (error) {
      console.error(`Error making POST request: ${error}`);
      if (error.response) {
        alert('There was a problem with the server response.');
      } else if (error.request) {
        alert('The server did not respond. Please check your internet connection and try again.');
      } else {
        alert('There was a problem sending your request.');
      }
    }
    setIsLoading(false);
  }

  // Function to handle the processed CSV data
  const handleCSVData = async (csvData) => {
    const formattedData = csvData.map((item, index) => ({
      id: index + 1,
      scanName: item['Scan Name'],
      type: item['Type'],
      module: item['Module'],
      source: item['Source'],
      'f/p': item['F/P'],
      data: item['Data'],
    }));
    setData(formattedData);
    setShowData(true);

    // Send a POST request with the CSV data to your server
    try {
      await axios.post('http://localhost:4000/api/csv_scan', formattedData);
    } catch (error) {
      console.error(`Error sending CSV data to server: ${error}`);
    }
  };

  const handleToggle = () => {
    setMethod(!method);
  };

  useEffect(() => {
    let newFilteredData = [...data];
    if (method && searchTerm) {
      const isExactSearch = searchTerm.startsWith('"') && searchTerm.endsWith('"');
      let searchQuery = searchTerm;
      if (isExactSearch) {
        searchQuery = searchTerm.slice(1, -1);
      } else {
        searchQuery = searchTerm.replace(/\s+/g, '');
      }
      newFilteredData = data.filter(item =>
        Object.values(item).some(value => {
          if (value !== undefined) {
            const stringValue = isExactSearch ? value.toString().toLowerCase() : value.toString().replace(/\s+/g, '').toLowerCase();
            const queryValue = searchQuery.toLowerCase();
            return isExactSearch ? stringValue.includes(queryValue) : stringValue.includes(queryValue);
          }
          return false;
        })
      );
    }
    setFilteredData(newFilteredData);
  }, [searchTerm, data, method]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px'}}>
      <ThemeProvider theme={theme}>
        <div className="container" style={{ margin: '0', padding: '0' }}>
          <h1 className="import" style={{ color: 'purple'}}>LIGHTNINGBOLT</h1>
          <p style={{ color: 'white'}}>Webcrawler</p>
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
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`} onClick={handleWebSearch}>Web Search</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`} onClick={() => window.location.href = 'http://localhost:5001'}>Spiderfoot</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black ${showData ? classes.activeButton : ''}`} onClick={() => setShowData(prevShowData => !prevShowData)}>Database</Button>
            <CSVUploadComponent onDataProcessed={handleCSVData} />
          </div>
          <div style={{ maxWidth: '1000px', display: 'fixed', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'auto', maxHeight: '500px', paddingTop: '10px'}}>
            {showData && <DataTable data={filteredData} />}
          </div>
          <div style={{ maxWidth: '1000px', display: 'fixed', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'auto', maxHeight: '500px', paddingTop: '10px'}}>
          {searchButtonPressed && (
              <Paper style={{ padding: '20px', marginTop: '20px', width: '100%' }}>
                <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                  {isLoading ? "Loading..." : searchButtonPressed && searchResults.data}
                </Typography>
                  {searchButtonPressed && !isLoading && (
                <Typography variant="body2">
                  Created At: {searchResults.created_at}, Updated At: {searchResults.updated_at}
                </Typography>
              )}
            </Paper>
            )}
            </div>
            </div>
      </ThemeProvider>
    </div>
  );
}

export default SearchComponent;