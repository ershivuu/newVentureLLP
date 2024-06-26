// src/ImageTable.js
import React, { useState, useEffect } from "react";
import {
  getAllGalleryImages,
  updateContainer2Image,
  deleteContainer2Image,
  addContainer2Image,
} from "../../AdminServices";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const EditGalleryContainer2 = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false); // New state for delete confirmation
  const [selectedImage, setSelectedImage] = useState({
    id: null,
    image2: null,
    main_table_id: null,
  });
  const [deleteImage, setDeleteImage] = useState(null); // New state for the image to be deleted
  const [newImage, setNewImage] = useState({
    image2: null,
    main_table_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGalleryImages();
      setGalleryImages(data);
    };

    fetchData();
  }, []);

  const handleEditClick = (id, main_table_id) => {
    setSelectedImage({ id, image2: null, main_table_id });
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenAdd(false);
    setOpenDelete(false); // Close the delete confirmation dialog
  };

  const handleSave = async () => {
    await updateContainer2Image(
      selectedImage.id,
      selectedImage.image2,
      selectedImage.main_table_id
    );
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
    setOpenEdit(false);
  };

  const handleFileChange = (e) => {
    setSelectedImage({ ...selectedImage, image2: e.target.files[0] });
  };

  const handleDeleteClick = (main_table_id, container2_image_id) => {
    setDeleteImage({ main_table_id, container2_image_id });
    setOpenDelete(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    await deleteContainer2Image(deleteImage.main_table_id, deleteImage.container2_image_id);
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
    setOpenDelete(false); // Close the delete confirmation dialog
  };

  const handleAddClick = () => {
    setNewImage({ image2: null, main_table_id: "" });
    setOpenAdd(true);
  };

  const handleAddSave = async () => {
    await addContainer2Image(newImage.image2, newImage.main_table_id);
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
    setOpenAdd(false);
  };

  const handleAddFileChange = (e) => {
    setNewImage({ ...newImage, image2: e.target.files[0] });
  };

  const handleMainTableIdChange = (e) => {
    setNewImage({ ...newImage, main_table_id: e.target.value });
  };

  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Top View Image
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          style={{ marginBottom: "16px" }}
        >
          Add Image
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Top-View Image</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleryImages.map((row, index) =>
                row.container2_image.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.main_heading}</TableCell>
                    <TableCell>
                      <img
                        src={image.img2}
                        alt={`Container 2 - ${image.id}`}
                        width="100"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() =>
                          handleEditClick(image.id, row.main_table_id)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() =>
                          handleDeleteClick(row.main_table_id, image.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openEdit} onClose={handleClose}>
          <DialogTitle>Edit Image</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <TextField
                fullWidth
                id="upload-image"
                type="file"
                onChange={handleFileChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAdd} onClose={handleClose}>
          <DialogTitle>Add Image</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="main-table-id">Select Project</InputLabel>
              <Select
                id="main-table-id"
                value={newImage.main_table_id}
                onChange={handleMainTableIdChange}
              >
                {galleryImages.map((row) => (
                  <MenuItem key={row.main_table_id} value={row.main_table_id}>
                    {row.main_heading}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                fullWidth
                id="upload-new-image"
                type="file"
                onChange={handleAddFileChange}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddSave} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDelete} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this image?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default EditGalleryContainer2;
