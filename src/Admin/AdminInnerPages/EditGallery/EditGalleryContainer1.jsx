// src/ImageTable.js
import React, { useState, useEffect } from "react";
import {
  getAllGalleryImages,
  updateContainer1Image,
  deleteContainer1Image,
  addContainer1Image,
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
  InputLabel,
  Input,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const EditGalleryContainer1 = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    id: null,
    image1: null,
    main_table_id: null,
  });
  const [newImage, setNewImage] = useState({
    image1: null,
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
    setSelectedImage({ id, image1: null, main_table_id });
    setOpenEdit(true);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSave = async () => {
    await updateContainer1Image(
      selectedImage.id,
      selectedImage.image1,
      selectedImage.main_table_id
    );
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
    setOpenEdit(false);
  };

  const handleAddSave = async () => {
    await addContainer1Image(newImage.image1, newImage.main_table_id);
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
    setOpenAdd(false);
  };

  const handleFileChangeEdit = (e) => {
    setSelectedImage({ ...selectedImage, image1: e.target.files[0] });
  };

  const handleFileChangeAdd = (e) => {
    setNewImage({ ...newImage, image1: e.target.files[0] });
  };

  const handleDeleteClick = async (main_table_id, container1_image_id) => {
    await deleteContainer1Image(main_table_id, container1_image_id);
    const updatedImages = await getAllGalleryImages();
    setGalleryImages(updatedImages);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Image
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Front-View Image</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleryImages.map((row, index) =>
              row.container1_image.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.main_heading}</TableCell>
                  <TableCell>
                    <img
                      src={image.img1}
                      alt={`Container 1 - ${image.id}`}
                      width="100"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleEditClick(image.id, row.main_table_id)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
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
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="upload-image">Upload Image</InputLabel>
            <Input
              id="upload-image"
              type="file"
              onChange={handleFileChangeEdit}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="main-table-id">Select Project</InputLabel>
            <Select
              id="main-table-id"
              value={newImage.main_table_id}
              onChange={(e) =>
                setNewImage({ ...newImage, main_table_id: e.target.value })
              }
            >
              {galleryImages.map((row) => (
                <MenuItem key={row.main_table_id} value={row.main_table_id}>
                  {row.main_heading}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="upload-new-image">Upload Image</InputLabel>
            <Input
              id="upload-new-image"
              type="file"
              onChange={handleFileChangeAdd}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditGalleryContainer1;
