import React, { useEffect, useState } from "react";
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
  TextField,
  Box,
  Typography
} from "@mui/material";
import { getGalleryBanner, updateGalleryBanner } from "../../AdminServices";
import EditIcon from '@mui/icons-material/Edit';
import Notification from "../../../Notification/Notification"; // Import the Notification component

const EditGalleryBanner = () => {
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({
    id: null,
    heading: "",
    banner_img: null, // Changed from "" to null
  });
  const [file, setFile] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getGalleryBanner();
        setBanner([data]);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
    setSelectedBanner({ id: null, heading: "", banner_img: null });
    setFile(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedBanner.heading) newErrors.heading = "Heading is required";
    if (!selectedBanner.banner_img && !file) newErrors.banner_img = "Banner image is required";
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        newErrors.banner_img = "Only JPG, JPEG, and PNG files are allowed";
      }
      if (file.size > 20 * 1024 * 1024) { // 20 MB
        newErrors.banner_img = "File size should be less than 20MB";
      }
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]);
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(files[0].type)) {
        setNotificationMessage("Only JPG, JPEG, and PNG files are allowed");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      } else if (files[0].size > 20 * 1024 * 1024) { // 20 MB
        setNotificationMessage("File size should be less than 20MB");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      } else {
        setNotificationOpen(false);
      }
    } else {
      setSelectedBanner({ ...selectedBanner, [name]: value });
    }
    // Remove error message as soon as the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setNotificationMessage("Please fix errors before saving");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("heading", selectedBanner.heading);
      if (file) {
        formData.append("banner_img", file);
      }
      const response = await updateGalleryBanner(selectedBanner.id, formData);
      setNotificationMessage(response.message); // Assuming the API response contains a message
      setNotificationSeverity("success");
      setNotificationOpen(true);
      const updatedBanner = await getGalleryBanner();
      setBanner([updatedBanner]);
      handleClose(); // Close the dialog and reset fields
    } catch (error) {
      setNotificationMessage("Error updating banner");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      console.error("Error updating banner:", error);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Banner
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banner.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.heading}</TableCell>
                  <TableCell>
                    <img
                      src={item.banner_img_url}
                      alt={item.original_name}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={selectedBanner.heading}
              onChange={handleChange}
              error={!!errors.heading}
              helperText={errors.heading}
            />
            <TextField
              margin="dense"
              type="file"
              fullWidth
              name="banner_img"
              onChange={handleChange}
              error={!!errors.banner_img}
              helperText={errors.banner_img}
            />
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
      </Box>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </>
  );
};

export default EditGalleryBanner;
