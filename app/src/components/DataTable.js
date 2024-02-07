import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/DataGrid.css';

function DataTable() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'url', headerName: 'URL', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'responseTime', headerName: 'Response Time', type: 'number', width: 130 },
  ];

  const rows = [
    { id: 1, url: 'http://example.com', status: '200 OK', responseTime: 120 },
    { id: 2, url: 'http://example2.com', status: '404 Not Found', responseTime: 200 },
    // Add more rows as needed
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;