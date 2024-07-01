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
import Notification from "../../../Notification/Notification"; // Adjust the import path as needed

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
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchAboutUsBanner();
      setBannerData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      showNotification("Error fetching data", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
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
      setEditedData({ ...editedData, imageFile: files[0] });
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleSaveEditedData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", selectedBanner.id);
      formData.append("heading", editedData.heading);
      formData.append("banner_img", editedData.imageFile);
  
      const response = await updateAboutUsBanner(selectedBanner.id, formData);
      updateBannerDataLocally({
        id: selectedBanner.id,
        heading: editedData.heading,
      });
  
      setEditDialogOpen(false);
      fetchData();
      showNotification(response.message, "success"); // Show success notification
    } catch (error) {
      console.error("Error updating data:", error);
      showNotification("Error updating data", "error"); // Show error notification
    }
  };

  const handleSaveAddData = async () => {
    try {
      const formData = new FormData();
      formData.append("heading", editedData.heading);
      formData.append("banner_img", editedData.imageFile);
  
      const response = await addAboutUsBanner(formData);
      setAddDialogOpen(false);
      fetchData();
      showNotification(response.message, "success"); // Show success notification
    } catch (error) {
      console.error("Error adding data:", error);
      showNotification("Error adding data", "error"); // Show error notification
    }
  };

  const handleDeleteData = async () => {
    try {
      const response = await deleteAboutUsBanner(selectedBanner.id);
      setDeleteDialogOpen(false);
      fetchData();
      showNotification(response.message, "success"); // Show success notification
    } catch (error) {
      console.error("Error deleting data:", error);
      showNotification("Error deleting data", "error"); // Show error notification
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
          />
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
            style={{ margin: "10px 0" }}
          />
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
          <Button onClick={handleDeleteData}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        message={notificationMessage}
        severity={notificationSeverity}
      />
    </Box>
  );
}

export default AboutBanner;
