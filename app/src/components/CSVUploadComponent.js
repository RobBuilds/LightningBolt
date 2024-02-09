import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVUploadComponent({ onDataProcessed }) {
  const [file, setFile] = useState(null);

  // Handles file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFile(selectedFile); // Set the selected file
    } else {
      console.error('File selection cancelled or no file selected');
    }
  };

  // Handles the upload and parsing of the CSV file
  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          console.log('Parsed CSV data:', result.data);
          onDataProcessed(result.data); // Pass the parsed data up to the parent component
        },
        header: true, // Treats the first row of the CSV as headers
        dynamicTyping: true, // Automatically convert strings to numbers or booleans
        skipEmptyLines: true, // Skip empty lines to avoid parsing errors or unnecessary data
        error: (error) => {
          console.error('Error while parsing CSV:', error);
        }
      });
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default CSVUploadComponent;
