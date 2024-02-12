import React, { useState } from 'react';
import Papa from 'papaparse';

function CSVUploadComponent({ onDataProcessed }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log('Parsed CSV data:', result.data);
          // Post the parsed CSV data to your server
          postCSVDataToServer(result.data);
          onDataProcessed(result.data);
        },
        error: (error) => {
          console.error('Error while parsing CSV:', error);
        }
      });
    } else {
      console.error('No file selected');
    }
  };

  const postCSVDataToServer = async (csvData) => {
    try {
      const response = await fetch('http://localhost:4000/api/csv_scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ csvData })
      });

      if (!response.ok) {
        throw new Error('Failed to upload CSV data');
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error posting CSV data to server:', error);
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
