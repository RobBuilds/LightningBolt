import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function CSVUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (result) => {
          console.log('Parsed CSV data:', result.data);
          try {
            const response = await axios.post('/api/csv_scan', { data: result.data });
            console.log('Data uploaded to the database:', response.data);
          } catch (error) {
            console.error('Error while uploading data to the database:', error);
          }
        },
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