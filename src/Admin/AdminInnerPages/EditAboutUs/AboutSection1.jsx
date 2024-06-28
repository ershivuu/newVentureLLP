import React, { useState, useEffect } from "react";
import {
  fetchAboutUsSectionFirst,
  updateAboutUsSectionFirst,
} from "../../AdminServices";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification"; // Adjust the import path as needed

function AboutSection1() {
  const [sectionData, setSectionData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    img_first: null,
    img_second: null,
    img_third: null,
  });

  // Notification state
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // Validation error state
  const [errors, setErrors] = useState({
    heading: false,
    content: false,
    img_first: false,
    img_second: false,
    img_third: false,
  });

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const data = await fetchAboutUsSectionFirst();
      setSectionData(data);
      setFormData({
        heading: data.heading,
        content: data.content,
        img_first: data.img_first,
        img_second: data.img_second,
        img_third: data.img_third,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    // Clear validation errors for heading
    if (name === 'heading') {
      setErrors({
        ...errors,
        heading: false,
      });
    }
  
    // Clear validation errors for content
    if (name === 'content') {
      setErrors({
        ...errors,
        content: false,
      });
    }
  };
  

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // Check if file is selected
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        showNotification("Only JPG, JPEG, or PNG files are allowed", "error");
        return;
      }

      // Validate file size (in bytes)
      const maxSize = 20 * 1024 * 1024; // 20 MB
      if (file.size > maxSize) {
        showNotification("File size exceeds 20 MB limit", "error");
        return;
      }

      // Update form data with selected file
      setFormData({
        ...formData,
        [name]: file,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form fields
      if (!validateForm()) {
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("content", formData.content);
      if (formData.img_first)
        formDataToSend.append("img_first", formData.img_first);
      if (formData.img_second)
        formDataToSend.append("img_second", formData.img_second);
      if (formData.img_third)
        formDataToSend.append("img_third", formData.img_third);

      const response = await updateAboutUsSectionFirst(formDataToSend);
      fetchSectionData();
      setOpen(false);
      showNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating data:", error);
      showNotification("Error updating data", "error");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      heading: false,
      content: false,
      img_first: false,
      img_second: false,
      img_third: false,
    };

    // Check if fields are empty or null
    if (!formData.heading || formData.heading.trim() === "") {
      newErrors.heading = true;
      valid = false;
    }
    if (!formData.content || formData.content.trim() === "") {
      newErrors.content = true;
      valid = false;
    }

    // Update error state
    setErrors(newErrors);

    return valid;
  };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  if (!sectionData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit About US
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Image 1</TableCell>
              <TableCell>Image 2</TableCell>
              <TableCell>Image 3</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{sectionData.heading}</TableCell>
              <TableCell>{sectionData.content}</TableCell>
              <TableCell>
                <img
                  src={sectionData.img_first}
                  alt={sectionData.img_first_originalname}
                  style={{ maxWidth: "100px" }}
                />
              </TableCell>
              <TableCell>
                <img
                  src={sectionData.img_second}
                  alt={sectionData.img_second_originalname}
                  style={{ maxWidth: "100px" }}
                />
              </TableCell>
              <TableCell>
                <img
                  src={sectionData.img_third}
                  alt={sectionData.img_third_originalname}
                  style={{ maxWidth: "100px" }}
                />
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit About Us Section 1</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            value={formData.heading}
            onChange={handleInputChange}
            error={errors.heading}
            helperText={errors.heading ? "This feild is required" : ""}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={formData.content}
            onChange={handleInputChange}
            error={errors.content}
            helperText={errors.content ? "This feild is required" : ""}
          />
          <TextField
            name="img_first"
            margin="dense"
            fullWidth
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextField
            name="img_second"
            margin="dense"
            fullWidth
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextField
            margin="dense"
            fullWidth
            name="img_third"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Box>
  );
}

export default AboutSection1;
