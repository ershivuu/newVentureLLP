// AboutBanner.js

import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import {
  fetchAboutUsBanner,
  updateAboutUsBanner,
  addAboutUsBanner,
  deleteAboutUsBanner,
} from "../../AdminServices";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your file structure

function AboutBanner() {
  const [bannerData, setBannerData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [editedData, setEditedData] = useState({
    id: "",
    heading: "",
    imageFile: null,
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // State to manage file validation errors
  const [fileError, setFileError] = useState({
    invalidType: false,
    sizeExceed: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchAboutUsBanner();
      setBannerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setEditedData({ id: banner.id, heading: banner.heading, imageFile: null });
    setEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setEditedData({ id: "", heading: "", imageFile: null });
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

    if (name === "banner_img") {
      const file = files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (file) {
        if (!allowedTypes.includes(file.type)) {
          setFileError({ invalidType: true, sizeExceed: false });
        } else if (file.size > 20 * 1024 * 1024) {
          setFileError({ invalidType: false, sizeExceed: true });
        } else {
          setFileError({ invalidType: false, sizeExceed: false });
          setEditedData({ ...editedData, imageFile: file });
        }
      }
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const isSaveDisabled = () => {
    return (
      editedData.imageFile === null ||
      fileError.invalidType ||
      fileError.sizeExceed
    );
  };

  const handleSaveEditedData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", selectedBanner.id);
      formData.append("heading", editedData.heading);
      formData.append("banner_img", editedData.imageFile);

      await updateAboutUsBanner(selectedBanner.id, formData);
      updateBannerDataLocally({
        id: selectedBanner.id,
        heading: editedData.heading,
      });

      setEditDialogOpen(false);
      fetchData();

      // Show success notification
      handleNotification(true, "Banner updated successfully!", "success");
    } catch (error) {
      console.error("Error updating data:", error);
      // Show error notification
      handleNotification(
        true,
        "Failed to update banner. Please try again.",
        "error"
      );
    }
  };

  const handleSaveAddData = async () => {
    try {
      const formData = new FormData();
      formData.append("heading", editedData.heading);
      formData.append("banner_img", editedData.imageFile);

      await addAboutUsBanner(formData);
      setAddDialogOpen(false);
      fetchData();

      // Show success notification
      handleNotification(true, "Banner added successfully!", "success");
    } catch (error) {
      console.error("Error adding data:", error);
      // Show error notification
      handleNotification(
        true,
        "Failed to add banner. Please try again.",
        "error"
      );
    }
  };

  const handleDeleteData = async () => {
    try {
      await deleteAboutUsBanner(selectedBanner.id);
      setDeleteDialogOpen(false);

      // Show success notification
      handleNotification(true, "Banner deleted successfully!", "success");

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      // Show error notification
      handleNotification(
        true,
        "Failed to delete banner. Please try again.",
        "error"
      );
    }
  };

  const updateBannerDataLocally = (updatedBanner) => {
    const updatedData = bannerData.map((banner) =>
      banner.id === updatedBanner.id
        ? { ...banner, heading: updatedBanner.heading }
        : banner
    );
    setBannerData(updatedData);
  };

  const handleNotification = (open, message, severity) => {
    setNotificationOpen(open);
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Banner
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
                  <img
                    src={banner.banner_img_path}
                    alt={banner.banner_img_originalname}
                    style={{ maxWidth: "100px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(banner)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteClick(banner)}
                  >
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
            style={{ margin: "10px 0" }}
            error={fileError.invalidType || fileError.sizeExceed}
            helperText={
              fileError.invalidType
                ? "Only PNG, JPEG, JPG files are allowed"
                : fileError.sizeExceed
                ? "File size should be less than 20MB"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEditedData} disabled={isSaveDisabled()}>
            Save
          </Button>
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
            style={{ margin: "10px 0" }}
            error={fileError.invalidType || fileError.sizeExceed}
            helperText={
              fileError.invalidType
                ? "Only PNG, JPEG, JPG files are allowed"
                : fileError.sizeExceed
                ? "File size should be less than 20MB"
                : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleSaveAddData} disabled={isSaveDisabled()}>
            Save
          </Button>
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
          <Button color="secondary" onClick={handleDeleteData}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </Box>
  );
}

export default AboutBanner;
