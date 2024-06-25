import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { fetchAboutUsBanner, updateAboutUsBanner, addAboutUsBanner, deleteAboutUsBanner } from '../../AdminServices';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function AboutBanner() {
  const [bannerData, setBannerData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editedData, setEditedData] = useState({ id: '', heading: '', imageFile: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchAboutUsBanner();
      setBannerData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setEditedData({ id: banner.id, heading: banner.heading, imageFile: null });
    setEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditedData({ id: '', heading: '', imageFile: null });
    setAddDialogOpen(true);
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'banner_img') {
      setEditedData({ ...editedData, imageFile: files[0] });
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleSaveEditedData = async () => {
    try {
      const formData = new FormData();
      formData.append('id', selectedBanner.id);
      formData.append('heading', editedData.heading);
      formData.append('banner_img', editedData.imageFile);

      await updateAboutUsBanner(selectedBanner.id, formData);
      updateBannerDataLocally({ id: selectedBanner.id, heading: editedData.heading });

      setEditDialogOpen(false);

      // Fetch data again after successful save to refresh the table
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleSaveAddData = async () => {
    try {
      const formData = new FormData();
      formData.append('heading', editedData.heading);
      formData.append('banner_img', editedData.imageFile);

      await addAboutUsBanner(formData);
      setAddDialogOpen(false);

      // Fetch data again after successful save to refresh the table
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleDeleteData = async () => {
    try {
      await deleteAboutUsBanner(selectedBanner.id);
      setDeleteDialogOpen(false);

      // Fetch data again after successful delete to refresh the table
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const updateBannerDataLocally = (updatedBanner) => {
    const updatedData = bannerData.map((banner) =>
      banner.id === updatedBanner.id ? { ...banner, heading: updatedBanner.heading } : banner
    );
    setBannerData(updatedData);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us Banner
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '16px' }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Banner Image</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bannerData.map((banner, index) => (
              <TableRow key={banner.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{banner.heading}</TableCell>
                <TableCell>
                  <img src={banner.banner_img_path} alt={banner.banner_img_originalname} style={{ maxWidth: '100px' }} />
                </TableCell>
                <TableCell>
                  <Button startIcon={<EditIcon />} onClick={() => handleEditClick(banner)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button startIcon={<DeleteIcon />} color="secondary" onClick={() => handleDeleteClick(banner)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Banner Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            fullWidth
            value={editedData.heading}
            onChange={handleInputChange}
          />
          <TextField
          margin="dense"
          fullWidth
            type="file"
            name="banner_img"
            onChange={handleInputChange}
            style={{ margin: '10px 0' }}
          />
          {/* {editedData.imageFile && (
            <img src={URL.createObjectURL(editedData.imageFile)} alt="Uploaded" style={{ maxWidth: '100px', marginTop: '10px' }} />
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEditedData}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Banner Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            fullWidth
            value={editedData.heading}
            onChange={handleInputChange}
          />
          <TextField
          margin="dense"
          fullWidth
            type="file"
            name="banner_img"
            onChange={handleInputChange}
            style={{ margin: '10px 0' }}
          />
          {/* {editedData.imageFile && (
            <img src={URL.createObjectURL(editedData.imageFile)} alt="Uploaded" style={{ maxWidth: '100px', marginTop: '10px' }} />
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleSaveAddData}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Banner</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this banner?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button color="secondary" onClick={handleDeleteData}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AboutBanner;
