import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVUploadComponent({ onDataProcessed }) {
  const [files, setFiles] = useState([]);

  // Handles file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files; // Get the selected files
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles); // Set the selected files
    } else {
      console.error('File selection cancelled or no files selected');
    }
  };

  // Handles the upload and parsing of the CSV files
  const handleUpload = () => {
    if (files.length > 0) {
      Array.from(files).forEach(file => {
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
      });
    } else {
      console.error('No files selected');
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default CSVUploadComponent;