import React, { useState, useEffect } from 'react';
import { Button, TextField, Switch, makeStyles, ThemeProvider, createTheme } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import DataTable from './DataTable';
import CSVUploadComponent from './CSVUploadComponent'; // Import the CSV upload component
import '../styles/fonts.css';

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

  // Function to handle the processed CSV data
  const handleCSVData = (csvData) => {
    // Convert parsed CSV (array of objects) to the expected object format
    const formattedData = csvData.map((item, index) => ({
      id: index + 1, // Assigning a unique ID
      scanName: item['Scan Name'], // Make sure the keys match the CSV header names
      type: item['Type'],
      module: item['Module'],
      source: item['Source'],
      'f/p': item['F/P'], // If F/P is a column name in your CSV, ensure it's written exactly as in the CSV
      data: item['Data'], // Same as above, ensure it matches the CSV header name
    }));
    setData(formattedData); // Update the state with the formatted data
    setShowData(true); // Set the flag to show the data table
  };


  const handleToggle = () => {
    setMethod(!method);
  };

  useEffect(() => {
    if (method) {
      const isExactSearch = searchTerm.startsWith('"') && searchTerm.endsWith('"');
      let searchQuery = searchTerm;
      if (isExactSearch) {
        searchQuery = searchTerm.slice(1, -1);
      } else {
        searchQuery = searchTerm.replace(/\s+/g, '');
      }
      const newFilteredData = data.filter(item =>
        Object.values(item).some(value => {
          const stringValue = isExactSearch ? value.toString().toLowerCase() : value.toString().replace(/\s+/g, '').toLowerCase();
          const queryValue = searchQuery.toLowerCase();
          return isExactSearch ? stringValue.includes(queryValue) : stringValue.includes(queryValue);
        })
      );
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(data);
    }
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
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`}>Web Search</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black`} onClick={() => window.location.href = 'http://localhost:5001'}>Spiderfoot</Button>
            <Button variant="contained" className={`${classes.button} bg-gray-300 text-black ${showData ? classes.activeButton : ''}`} onClick={() => setShowData(prevShowData => !prevShowData)}>Database</Button>
            <CSVUploadComponent onDataProcessed={handleCSVData} />
          </div>
          <div style={{ width: '100%', display: 'fixed', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'auto', maxHeight: '500px', paddingTop: '10px'}}>
            {showData && <DataTable data={filteredData} />}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default SearchComponent;