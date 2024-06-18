import React, { useEffect, useState } from 'react';
import { getAllSectionFirst, updateSectionFirstContent } from '../../AdminServices';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


function PageHeading() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: '',
    heading: '',
    content: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSectionFirst();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = (section) => {
    setEditData(section);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { id: editData.id, content: editData.content,heading:editData.heading };
      await updateSectionFirstContent(editData.id, updatedData);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id ? { ...item, content: editData.content,heading:editData.heading } : item
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
      setError(error.message);
    } finally {
      handleClose();
    }
  };

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>Page Heading</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.id}</TableCell>
                <TableCell>{section.heading}</TableCell>
                <TableCell>{section.content}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleClickOpen(section)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this section, please modify the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            variant="standard"
            value={editData.heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
            value={editData.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PageHeading;
