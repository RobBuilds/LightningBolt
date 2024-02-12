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

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
}

export default CSVUploadComponent;