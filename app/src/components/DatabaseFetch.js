import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, makeStyles, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  error: {
    color: 'red',
  },
}));

function DataFetchComponent() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState(''); // For creating new data
  const [error, setError] = useState(null); // For storing error messages
  const [open, setOpen] = useState(false); // For controlling the dialog
  const [updateDataValue, setUpdateDataValue] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/analysis_results');
      const dataWithIds = response.data.map((item, index) => ({ ...item, id: index }));
      setData(dataWithIds);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error fetching data');
    }
    setIsLoading(false);
  };

  const createData = async () => {
    try {
      await axios.post('http://localhost:4000/api/analysis_results', { data: newData });
      fetchData(); // Re-fetch data after creating new data
    } catch (error) {
      console.error("Error creating data:", error);
      setError('Error creating data');
    }
  };

  const updateData = async () => {
    try {
      await axios.put(`http://localhost:4000/api/analysis_results/${updateId}`, { data: updateDataValue });
      fetchData(); // Re-fetch data after updating data
    } catch (error) {
      console.error("Error updating data:", error);
      setError('Error updating data');
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/analysis_results/${id}`);
      fetchData(); // Re-fetch data after deleting data
    } catch (error) {
      console.error("Error deleting data:", error);
      setError('Error deleting data');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'data', headerName: 'Data', width: 200 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => deleteData(params.row.id)}>
          Delete
        </Button>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleUpdateOpen(params.row.id, params.row.data)}>
          Update
        </Button>
      ),
    },
  ];

  const handleUpdateOpen = (id, data) => {
    setUpdateId(id);
    setUpdateDataValue(data);
    setOpen(true);
  };

  const handleClose = () => {
    setUpdateId(null);
    setUpdateDataValue('');
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCreate = async () => {
    if (updateId) {
      await updateData();
    } else {
      await createData();
    }
    setOpen(false);
  };


  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={classes.error}>
          <Typography variant="h6">{error}</Typography>
        </div>
        ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} pageSize={5} style={{ backgroundColor: '#fff' }} />
          <Button variant="contained" color="primary" onClick={handleOpen}>Create Data</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Data</DialogTitle>
            <DialogContent>
              <TextField value={newData} onChange={(e) => setNewData(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={handleCreate} color="primary">Create</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default DataFetchComponent;