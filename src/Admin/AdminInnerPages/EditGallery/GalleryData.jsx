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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../Notification/Notification";
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
  const [formErrors, setFormErrors] = useState({
    main_heading: false,
    container1_image: false,
    container2_image: false,
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllGalleryImages();
      setGalleryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const handleDelete = async (deleteItemId) => {
    try {
      const response = await deleteGalleryImage(deleteItemId);
      await fetchData(); // Refresh data after delete
      handleNotification(response.message, "success"); 
    } catch (error) {
      console.error("Error deleting data:", error);
      handleNotification("Error deleting data", "error"); 
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // Check for file type and size validation
    if (files && files[0]) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxFileSize = 20 * 1024 * 1024; // 20 MB in bytes
  
      if (!allowedTypes.includes(files[0].type)) {
        handleNotification("Only JPG, JPEG, and PNG formats are allowed", "error");
        // Clear the file input
        e.target.value = null;
        return;
      }
  
      if (files[0].size > maxFileSize) {
        handleNotification("File size exceeds 20 MB limit", "error");
        // Clear the file input
        e.target.value = null;
        return;
      }
  
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  
    // Clear error for the field if it's now filled
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  
  const handleSubmit = async () => {
    let hasError = false;
    const errors = {
      main_heading: !formData.main_heading,
      container1_image: !formData.container1_image,
      container2_image: !formData.container2_image,
    };

    setFormErrors(errors);

    // Check if any required fields are empty
    for (const key in errors) {
      if (errors[key]) {
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const form = new FormData();
    form.append("main_heading", formData.main_heading);
    form.append("container1_image", formData.container1_image);
    form.append("container2_image", formData.container2_image);

    try {
      const response = await addGalleryImages(form);
      await fetchData(); 
      handleNotification(response.message, "success"); 
     
      setFormData({
        main_heading: "",
        container1_image: null,
        container2_image: null,
      });
      handleClose();
    } catch (error) {
      console.error("Error adding data:", error);
      handleNotification("Error adding data", "error"); 
    }
  };

  const handleNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
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
            error={formErrors.main_heading}
            helperText={formErrors.main_heading && "This feild is required"}
          />
          <TextField
            margin="dense"
            name="container1_image"
            type="file"
            fullWidth
            onChange={handleChange}
            error={formErrors.container1_image}
            helperText={
              formErrors.container1_image && "This feild is required"
            }
          />
          <TextField
            margin="dense"
            name="container2_image"
            type="file"
            fullWidth
            onChange={handleChange}
            error={formErrors.container2_image}
            helperText={
              formErrors.container2_image && "This feild is required"
            }
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
              <TableCell>Delete</TableCell>
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
          <Button
            onClick={() => {
              handleDelete(deleteItemId);
              handleDeleteDialogClose();
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Notification
        open={notificationOpen}
        handleClose={closeNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Box>
  );
}

export default GalleryData;
