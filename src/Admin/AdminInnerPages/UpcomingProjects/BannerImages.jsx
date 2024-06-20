import React, { useState, useEffect } from "react";
import {
  getAllBannerImages,
  updateBannerImage,
  addBannerImage,
  deleteBannerImage,
} from "../../AdminServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TableContainer,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../../Notification/Notification";
import "./UpcomingProjects.css";

function BannerImages() {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editImageId, setEditImageId] = useState(null);
  const [deleteImageId, setDeleteImageId] = useState(null);
  const [file, setFile] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const images = await getAllBannerImages();
        setBannerImages(images[0].banner_images);
        setLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setNotification({
        open: true,
        message: "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
        severity: "error",
      });
      setFile(null);
      setFileError("");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setNotification({
        open: true,
        message: "File size exceeds 20MB limit.",
        severity: "error",
      });
      setFile(null);
      setFileError("");
      return;
    }

    setFile(selectedFile);
    setFileError("");
  };

  const handleUpdateImage = async () => {
    if (!file) {
      setFileError("This field is required");
      return;
    }
    try {
      const response = await updateBannerImage(editImageId, file);
      const updatedImages = await getAllBannerImages();
      setBannerImages(updatedImages[0].banner_images);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
      setOpenEditDialog(false);
      setEditImageId(null);
      setFile(null);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleAddImage = async () => {
    if (!file) {
      setFileError("This field is required");
      return;
    }
    try {
      const response = await addBannerImage(file);
      const updatedImages = await getAllBannerImages();
      setBannerImages(updatedImages[0].banner_images);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
      setOpenAddDialog(false);
      setFile(null);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await deleteBannerImage(deleteImageId);
      const updatedImages = await getAllBannerImages();
      setBannerImages(updatedImages[0].banner_images);
      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
      setOpenDeleteDialog(false);
      setDeleteImageId(null);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleClickOpenEditDialog = (imageId) => {
    setEditImageId(imageId);
    setOpenEditDialog(true);
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleClickOpenDeleteDialog = (imageId) => {
    setDeleteImageId(imageId);
    setOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditImageId(null);
    setFile(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setFile(null);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteImageId(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Banner Images
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleClickOpenAddDialog}
      >
        Add Images
      </Button>
      <Box className="set-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bannerImages &&
                bannerImages.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.img_name}</TableCell>
                    <TableCell>
                      <img
                        src={item.img_path}
                        alt={item.img_name}
                        style={{ maxWidth: "100px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => handleClickOpenEditDialog(item.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickOpenDeleteDialog(item.id)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* // edit banner image  */}
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Banner Image</DialogTitle>
            <DialogContent>
              <TextField type="file" onChange={handleFileChange} fullWidth />
              {fileError && <Typography color="error">{fileError}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button onClick={handleUpdateImage} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          {/* Add Dialog */}
          <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
            <DialogTitle>Add Banner Image</DialogTitle>
            <DialogContent>
              <TextField
                type="file"
                onChange={handleFileChange}
                name="banner_img"
                fullWidth
              />
              {fileError && <Typography color="error">{fileError}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog}>Cancel</Button>
              <Button onClick={handleAddImage} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this image?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button onClick={handleDeleteImage} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </Box>
      <Notification
        open={notification.open}
        handleClose={handleCloseNotification}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Box>
  );
}

export default BannerImages;
