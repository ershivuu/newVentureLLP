import React, { useEffect, useState } from "react";
import {
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
  Button,
  TextField,
} from "@mui/material";
import {
  getAboutUsSectionSecond,
  updateAboutUsSectionSecond,
} from "../../AdminServices"; // Assuming your service file is in the same directory
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure

// Truncate text after two words
const truncateText = (text) => {
  const words = text.split(" ");
  if (words.length > 2) {
    return words.slice(0, 2).join(" ") + "...";
  }
  return text;
};

function AboutSection2() {
  const [aboutData, setAboutData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    heading_first: "",
    content_first: "",
    heading_second: "",
    content_second: "",
  });

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // State to manage form validation errors
  const [errors, setErrors] = useState({
    heading_first: false,
    content_first: false,
    heading_second: false,
    content_second: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutUsSectionSecond();
      setAboutData(data);
      setFormData({
        id: data.id,
        heading_first: data.heading_first,
        content_first: data.content_first,
        heading_second: data.heading_second,
        content_second: data.content_second,
      });
    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear validation error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      heading_first: !formData.heading_first.trim(),
      content_first: !formData.content_first.trim(),
      heading_second: !formData.heading_second.trim(),
      content_second: !formData.content_second.trim(),
    };

    // Check if any field is empty
    if (
      newErrors.heading_first ||
      newErrors.content_first ||
      newErrors.heading_second ||
      newErrors.content_second
    ) {
      valid = false;
    }

    // Update errors state
    setErrors(newErrors);

    return valid;
  };

  const handleFormSubmit = async () => {
    try {
      const isValid = validateForm();

      if (!isValid) {
        // Return if form is invalid
        return;
      }

      // Call your update API here with formData
      const response = await updateAboutUsSectionSecond(formData);

      // Close the dialog after submitting
      setOpenDialog(false);

      // Refetch data to update the table
      const updatedData = await getAboutUsSectionSecond();
      setAboutData(updatedData);

      // Show success notification with API response message
      showNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating data:", error);
      // Show error notification
      showNotification("Error updating data", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  return (
    <div>
      <h2>Edit Mission & Vision</h2>
      {aboutData ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S No.</TableCell>
                  <TableCell>Heading First</TableCell>
                  <TableCell>Content First</TableCell>
                  <TableCell>Heading Second</TableCell>
                  <TableCell>Content Second</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>{truncateText(aboutData.heading_first)}</TableCell>
                  <TableCell>{truncateText(aboutData.content_first)}</TableCell>
                  <TableCell>
                    {truncateText(aboutData.heading_second)}
                  </TableCell>
                  <TableCell>
                    {truncateText(aboutData.content_second)}
                  </TableCell>
                  <TableCell>
                    <Button startIcon={<EditIcon />} onClick={handleEditClick}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Edit About Section 2</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Heading First"
                name="heading_first"
                value={formData.heading_first}
                onChange={handleInputChange}
                error={errors.heading_first}
                helperText={
                  errors.heading_first && "Heading First is required"
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content First"
                name="content_first"
                value={formData.content_first}
                onChange={handleInputChange}
                error={errors.content_first}
                helperText={errors.content_first && "Content First is required"}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Heading Second"
                name="heading_second"
                value={formData.heading_second}
                onChange={handleInputChange}
                error={errors.heading_second}
                helperText={
                  errors.heading_second && "Heading Second is required"
                }
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content Second"
                name="content_second"
                value={formData.content_second}
                onChange={handleInputChange}
                error={errors.content_second}
                helperText={
                  errors.content_second && "Content Second is required"
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleFormSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default AboutSection2;
