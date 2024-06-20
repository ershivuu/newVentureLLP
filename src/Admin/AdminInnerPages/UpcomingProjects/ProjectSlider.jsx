import React, { useEffect, useState } from "react";
import {
  getAllSliderImages,
  updateSliderImage,
  deleteSliderImage,
} from "../../AdminServices";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../Notification/Notification"; // Adjust the import path as necessary

function ProjectSlider() {
  const [sliderImages, setSliderImages] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [fieldError, setFieldError] = useState("");

  const fetchSliderImages = async () => {
    try {
      const data = await getAllSliderImages();
      console.log(data, "Fetched slider images");
      const flattenedImages = data.flatMap((item) => item.slider_images);
      setSliderImages(flattenedImages);
    } catch (error) {
      console.error("Error fetching slider images:", error);
    }
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const handleEditClick = (image) => {
    setSelectedImage(image);
    setOpenEdit(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setNotification({
        open: true,
        message: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
        severity: "error",
      });
      setSelectedFile(null);
      setFieldError(""); // Clear field error
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setNotification({
        open: true,
        message: "File size exceeds 20MB limit.",
        severity: "error",
      });
      setSelectedFile(null);
      setFieldError(""); // Clear field error
      return;
    }

    setSelectedFile(selectedFile);
    setFieldError(""); // Clear field error when a valid file is selected
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedFile(null);
    setFieldError("");
  };

  const handleUpdate = async () => {
    if (!selectedFile) {
      setFieldError("This field is required");
      return;
    }

    try {
      const response = await updateSliderImage(selectedImage.id, selectedFile);
      const data = await getAllSliderImages();
      const flattenedImages = data.flatMap((item) => item.slider_images);
      setSliderImages(flattenedImages);
      setNotification({
        open: true,
        message: response.message, // Using the message from the API response
        severity: "success",
      });
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating slider image:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error updating image",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (imageId) => {
    setDeleteImageId(imageId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteImageId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteSliderImage(deleteImageId);
      fetchSliderImages();
      setNotification({
        open: true,
        message: response.message, // Using the message from the API response
        severity: "success",
      });
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting slider image:", error);
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error deleting image",
        severity: "error",
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Slider Images
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sliderImages.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.file_name}</TableCell>
                <TableCell>
                  <img
                    src={item.slider_img_path}
                    alt={item.file_name}
                    width="100"
                  />
                </TableCell>
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

      {/* Edit slider images */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Slider Image</DialogTitle>
        <DialogContent>
          <TextField type="file" onChange={handleFileChange} fullWidth />
          {fieldError && <Typography color="error">{fieldError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete slider image confirmation dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Slider Image</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Box>
  );
}

export default ProjectSlider;
