import React, { useEffect, useState } from "react";
import {
  getAllGalleryImages,
  addGalleryImages,
  deleteGalleryImage,
} from "../../AdminServices";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function GalleryData() {
  const [galleryData, setGalleryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    main_heading: "",
    container1_image: null,
    container2_image: null,
  });
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGalleryImages();
        setGalleryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteDialogOpen = (mainTableId) => {
    setDeleteItemId(mainTableId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteItemId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteGalleryImage(deleteItemId);
      const data = await getAllGalleryImages();
      setGalleryData(data);
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Error deleting data:", error);
      alert(`Error deleting data: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("main_heading", formData.main_heading);
    form.append("container1_image", formData.container1_image);
    form.append("container2_image", formData.container2_image);

    try {
      await addGalleryImages(form);
      handleClose();
      const data = await getAllGalleryImages();
      setGalleryData(data);
      // Reset the form fields
      setFormData({
        main_heading: "",
        container1_image: null,
        container2_image: null,
      });
    } catch (error) {
      console.error("Error adding data:", error);
      alert(`Error adding data: ${error.message}`);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Project
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        // className="add-btn"
        style={{ marginBottom: "16px" }}
        onClick={handleClickOpen}
      >
        Add Projects
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Gallery Images</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="main_heading"
            label="Main Heading"
            type="text"
            fullWidth
            value={formData.main_heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="container1_image"
            type="file"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="container2_image"
            type="file"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Project Heading</TableCell>
              <TableCell>Front View Images</TableCell>
              <TableCell>Top View Images</TableCell>
              <TableCell>Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleryData.map((item, index) => (
              <TableRow key={item.main_table_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.main_heading}</TableCell>
                <TableCell>
                  {item.container1_image.length > 0 && (
                    <img
                      src={item.container1_image[0].img1}
                      alt="Container 1"
                      style={{ width: 100, height: 100, margin: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {item.container2_image.length > 0 && (
                    <img
                      src={item.container2_image[0].img2}
                      alt="Container 2"
                      style={{ width: 100, height: 100, margin: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteDialogOpen(item.main_table_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GalleryData;
