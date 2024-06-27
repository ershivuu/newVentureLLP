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
  Box,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Notification from "../../../Notification/Notification"; 

const EditGalleryContainer1 = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState({
    id: null,
    image1: null,
    main_table_id: null,
  });
  const [imageToDelete, setImageToDelete] = useState({
    main_table_id: null,
    container1_image_id: null,
  });
  const [newImage, setNewImage] = useState({
    image1: null,
    main_table_id: "",
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
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

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSave = async () => {
    try {
      const response = await updateContainer1Image(
        selectedImage.id,
        selectedImage.image1,
        selectedImage.main_table_id
      );
  
      // Fetch updated data and update state
      const updatedImages = await getAllGalleryImages();
      setGalleryImages(updatedImages);
  
      setOpenEdit(false);
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating image:", error);
      handleNotification("Error updating image", "error");
    }
  };
  


  const handleAddSave = async () => {
    if (!newImage.main_table_id) {
      handleNotification("Please select a project", "error");
      return;
    }
  
    try {
   const response =   await addContainer1Image(newImage.image1, newImage.main_table_id);
      const updatedImages = await getAllGalleryImages();
      setGalleryImages(updatedImages);
      setOpenAdd(false);
  
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding image:", error);
      handleNotification("Error adding image", "error");
    }
  };
  

  const handleFileChangeEdit = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) {
      handleNotification("Only JPG, JPEG, and PNG formats are allowed", "error");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      handleNotification("Image size should not exceed 20 MB", "error");
      return;
    }
    setSelectedImage({ ...selectedImage, image1: e.target.files[0] });
  };

  const handleFileChangeAdd = (e) => {

    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!validTypes.includes(file.type)) {
      handleNotification("Only JPG, JPEG, and PNG formats are allowed", "error");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      handleNotification("Image size should not exceed 20 MB", "error");
      return;
    }
    setNewImage({ ...newImage, image1: e.target.files[0] });
  };

  const handleDeleteClick = (main_table_id, container1_image_id) => {
    setImageToDelete({ main_table_id, container1_image_id });
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
    const response =  await deleteContainer1Image(
        imageToDelete.main_table_id,
        imageToDelete.container1_image_id
      );
  
      const updatedImages = await getAllGalleryImages();
      setGalleryImages(updatedImages);
      setOpenDelete(false);
  
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting image:", error);
      handleNotification("Error deleting image", "error");
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
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Front View Image
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
                <TableCell>S.No</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Front-View Image</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleryImages.map((item, index) =>
                item.container1_image.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.main_heading}</TableCell>
                    <TableCell>
                      <img
                        src={image.img1}
                        alt={`Container 1 - ${image.id}`}
                        width="100"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() =>
                          handleEditClick(image.id, item.main_table_id)
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
                          handleDeleteClick(item.main_table_id, image.id)
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
              
              <TextField
              fullWidth
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
                {galleryImages.map((item) => (
                  <MenuItem key={item.main_table_id} value={item.main_table_id}>
                    {item.main_heading}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
      
              <TextField
              fullWidth
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

        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this image?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="error">
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
    </>
  );
};

export default EditGalleryContainer1;
