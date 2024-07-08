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
import Notification from "../../../Notification/Notification"; // Replace with correct path

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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("error");

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
    // Limit characters in heading field
    if (name === "heading" && value.length >= 30) {
      setNotificationMessage("Heading cannot exceed 30 characters.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    // Limit characters in content field
    if (name === "content" && value.length >= 300) {
      setNotificationMessage("Content cannot exceed 300 characters.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    // Check if files are selected
    if (files.length === 0) {
      return;
    }

    // Check file types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(files[0].type)) {
      setNotificationMessage("Only JPG, JPEG, or PNG files are allowed.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    // Check file size (in bytes)
    const maxSize = 20 * 1024 * 1024; // 20 MB
    if (files[0].size > maxSize) {
      setNotificationMessage("File size cannot exceed 20 MB.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    // If all validations pass, update formData
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      formDataToSend.append("content", formData.content);
      if (formData.img_first)
        formDataToSend.append("img_first", formData.img_first);
      if (formData.img_second)
        formDataToSend.append("img_second", formData.img_second);
      if (formData.img_third)
        formDataToSend.append("img_third", formData.img_third);

      await updateAboutUsSectionFirst(formDataToSend);
      fetchSectionData();
      handleClose();
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage("Failed to update data.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
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
                <br />
                {/* {sectionData.img_first_originalname} */}
              </TableCell>
              <TableCell>
                <img
                  src={sectionData.img_second}
                  alt={sectionData.img_second_originalname}
                  style={{ maxWidth: "100px" }}
                />
                <br />
                {/* {sectionData.img_second_originalname} */}
              </TableCell>
              <TableCell>
                <img
                  src={sectionData.img_third}
                  alt={sectionData.img_third_originalname}
                  style={{ maxWidth: "100px" }}
                />
                <br />
                {/* {sectionData.img_third_originalname} */}
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
            inputProps={{ maxLength: 30 }} // Limit max characters
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={formData.content}
            onChange={handleInputChange}
            inputProps={{ maxLength: 300 }} // Limit max characters
          />
          <TextField
            name="img_first"
            margin="dense"
            fullWidth
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png"
          />
          <TextField
            name="img_second"
            margin="dense"
            fullWidth
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png"
          />
          <TextField
            margin="dense"
            fullWidth
            name="img_third"
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png"
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
