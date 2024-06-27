import React, { useState, useEffect } from "react";
import {
  getAllGalleryImages,
  updateMainHeading,
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
  TextField,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification";

const EditGalleryHeading = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState({
    id: null,
    main_heading: "",
  });

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // State for validation error
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGalleryImages();
      setGalleryImages(data);
    };

    fetchData();
  }, []);

  const handleEditClick = (id, main_heading) => {
    setSelectedHeading({ id, main_heading });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidationError(false); // Reset validation error on close
  };

  const handleSave = async () => {
    if (!selectedHeading.main_heading.trim()) {
      setValidationError(true);
      return;
    }

    try {
      const response = await updateMainHeading(
        selectedHeading.id,
        selectedHeading.main_heading
      );

      // Handle success
      setGalleryImages(
        galleryImages.map((item) =>
          item.main_table_id === selectedHeading.id
            ? { ...item, main_heading: selectedHeading.main_heading }
            : item
        )
      );

      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating data:", error);
      // Show error notification
      handleNotification("Error updating data", "error");
    } finally {
      setOpen(false); // Close dialog regardless of success or failure
    }
  };

  const handleChange = (e) => {
    setSelectedHeading({ ...selectedHeading, main_heading: e.target.value });
    setValidationError(false); // Reset validation error on input change
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
          Edit Project Name
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {galleryImages.map((row, index) => (
                <TableRow key={row.main_table_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.main_heading}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() =>
                        handleEditClick(row.main_table_id, row.main_heading)
                      }
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
          <DialogTitle>Edit Main Heading</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Main Heading"
              type="text"
              fullWidth
              value={selectedHeading.main_heading}
              onChange={handleChange}
              error={validationError} // Show error state if validation fails
              helperText={validationError ? "This field is required" : ""}
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

        {/* Notification component */}
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

export default EditGalleryHeading;
