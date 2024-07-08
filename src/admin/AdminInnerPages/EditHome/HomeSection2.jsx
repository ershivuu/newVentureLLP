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
import Notification from "../../../Notification/Notification"; // Adjust the import path as needed

function HomeSection2() {
  const [data, setData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [fileError, setFileError] = useState(null); // State for file errors

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getHomeSectionSecond();
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (imageData) => {
    setSelectedImage(imageData);
    setOpenUpdateDialog(true);
  };

  const handleAddClick = () => {
    setSelectedImage(null);
    setOpenAddDialog(true);
  };

  const handleCloseAddUpdateDialog = () => {
    setOpenAddDialog(false);
    setOpenUpdateDialog(false);
    setImageFile(null);
    setFileError(null); // Reset file error state
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setFileError("File size exceeds 20 MB");
      } else if (
        !["image/png", "image/jpeg", "image/jpg"].includes(file.type)
      ) {
        setFileError("Only PNG, JPEG, and JPG files are allowed");
      } else {
        setImageFile(file);
        setFileError(null);
      }
    }
  };

  const handleUpdateImage = async () => {
    if (!imageFile) return; // Prevent submitting without a valid file

    try {
      const formData = new FormData();
      formData.append("slider_img", imageFile);
      const idToUpdate = selectedImage.second_id;
      const response = await updateHomeSectionSecond(idToUpdate, formData);
      if (response && response.data && response.data.slider_img_path) {
        const updatedData = data.map((item) =>
          item.id === idToUpdate
            ? { ...item, slider_img_path: response.data.slider_img_path }
            : item
        );
        setData(updatedData);
        setNotification({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      handleCloseAddUpdateDialog();
      fetchData();
    }
  };

  const handleAddImage = async () => {
    if (!imageFile) return; // Prevent submitting without a valid file

    try {
      const formData = new FormData();
      formData.append("slider_img", imageFile);
      const response = await addHomeSectionSecond(formData);
      if (response && response.data) {
        setData([...data, response.data]);
        setNotification({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error adding image:", error);
    } finally {
      handleCloseAddUpdateDialog();
      fetchData();
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteId(item.second_id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteHomeSectionSecond(deleteId);
      if (response && response.data && response.data.message) {
        setData(data.filter((item) => item.id !== deleteId));
        setNotification({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setOpenDeleteDialog(false);
      fetchData();
    }
  };

  const handleNotificationClose = () => {
    setNotification((prevState) => ({
      ...prevState,
      open: false,
    }));
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
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openAddDialog || openUpdateDialog}
        onClose={handleCloseAddUpdateDialog}
      >
        <DialogTitle>{openAddDialog ? "Add Image" : "Edit Image"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="file"
            onChange={handleImageChange}
            error={!!fileError}
            helperText={fileError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddUpdateDialog}>Cancel</Button>
          <Button
            onClick={openAddDialog ? handleAddImage : handleUpdateImage}
            variant="contained"
            color="primary"
            disabled={!!fileError || !imageFile}
          >
            {openAddDialog ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

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

      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Box>
  );
}

export default HomeSection2;
