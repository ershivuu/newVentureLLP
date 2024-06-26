import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import {
  getHomeSectionSecond,
  updateHomeSectionSecond,
  addHomeSectionSecond,
  deleteHomeSectionSecond,
} from "../../AdminServices";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

function HomeSection2() {
  const [data, setData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = async () => {
    const result = await getHomeSectionSecond();
    if (result) {
      setData(result.data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (imageData) => {
    setSelectedImage(imageData);
    setOpenUpdateDialog(true);
  };

  const handleAddClick = () => {
    setSelectedImage(null);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setImageFile(null);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdateImage = async () => {
    if (selectedImage && imageFile) {
      const formData = new FormData();
      formData.append("slider_img", imageFile);
      const idToUpdate = selectedImage.second_id;
      const result = await updateHomeSectionSecond(idToUpdate, formData);
      if (result && result.data && result.data.slider_img_path) {
        console.log("Image updated successfully:", result);

        const updatedData = data.map((item) => {
          if (item.id === idToUpdate) {
            return { ...item, slider_img_path: result.data.slider_img_path };
          }
          return item;
        });
        setData(updatedData);
      } else {
        console.error("Error updating image");
      }
    }
    fetchData();
    handleCloseUpdateDialog();
  };

  const handleAddImage = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("slider_img", imageFile);
      const result = await addHomeSectionSecond(formData);
      if (result && result.data) {
        console.log("Image added successfully:", result);

        setData([...data, result.data]);
        handleCloseAddDialog(); // Close the dialog after adding the image
      } else {
        console.error("Error adding image");
      }
    }
    handleCloseAddDialog();
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const result = await deleteHomeSectionSecond(deleteId);
      if (result && result.success) {
        console.log("Image deleted successfully");
        setData(data.filter((item) => item.id !== deleteId)); // Remove deleted item from the data
        setOpenDeleteDialog(false);
        handleCloseDeleteDialog();
      } else {
        console.error("Error deleting image");
      }
    }
    handleCloseDeleteDialog();
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Slider
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: "16px" }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Slider Image</TableCell>
              <TableCell>Original Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.slider_img_path}
                    alt="Slider"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </TableCell>
                <TableCell>{item.original_name}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <TextField fullWidth type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddImage} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <TextField fullWidth type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
          <Button
            onClick={handleUpdateImage}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="primary"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HomeSection2;
