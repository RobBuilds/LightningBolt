import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/DataGrid.css';

// Adjust the DataTable component to accept data as a prop
function DataTable({ data }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'url', headerName: 'URL', width: 200 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'responseTime', headerName: 'Response Time', type: 'number', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default DataTable;