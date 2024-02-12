import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '../styles/DataGrid.css';

function DataTable({ data = [] }) { // Default data to an empty array if not provided
  // Generate unique IDs for each row
  const rowsWithIds = data.map((row, index) => ({ ...row, id: index + 1 }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'scanName', headerName: 'Scan Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'module', headerName: 'Module', width: 130 },
    { field: 'source', headerName: 'Source', width: 130 },
    { field: 'f/p', headerName: 'F/P', width: 130 },
    { field: 'data', headerName: 'Data', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className="dataGrid"
        rows={rowsWithIds}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        // Add a property to hide the no rows overlay when there's no data
        hideFooterSelectedRowCount={data.length === 0}
        components={{
          NoRowsOverlay: () => <div style={{ padding: 10 }}>No data available</div>,
        }}
      />
    </div>
  );
}

export default DataTable;

