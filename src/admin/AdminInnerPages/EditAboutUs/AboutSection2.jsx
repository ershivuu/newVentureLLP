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
} from "../../AdminServices";
import EditIcon from "@mui/icons-material/Edit";

import Notification from "../../../Notification/Notification"; // Adjust the import path as needed

const MAX_HEADING_LENGTH = 20;
const MAX_CONTENT_LENGTH = 500;

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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

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

    // Enforce character limits
    if (name === "heading_first" && value.length >= MAX_HEADING_LENGTH) {
      showNotification("Heading should be 20 characters or less", "error");
      return;
    }
    if (
      (name === "content_first" || name === "content_second") &&
      value.length >= MAX_CONTENT_LENGTH
    ) {
      showNotification("Content should be 300 characters or less", "error");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await updateAboutUsSectionSecond(formData);
      showNotification("Data updated successfully", "success");
      setOpenDialog(false);
      const updatedData = await getAboutUsSectionSecond();
      setAboutData(updatedData);
    } catch (error) {
      showNotification("Failed to update data", "error");
    }
  };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
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
                  <TableCell>{aboutData.heading_first}</TableCell>
                  <TableCell>{aboutData.content_first}</TableCell>
                  <TableCell>{aboutData.heading_second}</TableCell>
                  <TableCell>{aboutData.content_second}</TableCell>
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
                inputProps={{ maxLength: MAX_HEADING_LENGTH }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content First"
                name="content_first"
                value={formData.content_first}
                onChange={handleInputChange}
                multiline
                rows={4}
                inputProps={{ maxLength: MAX_CONTENT_LENGTH }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Heading Second"
                name="heading_second"
                value={formData.heading_second}
                onChange={handleInputChange}
                inputProps={{ maxLength: MAX_HEADING_LENGTH }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content Second"
                name="content_second"
                value={formData.content_second}
                onChange={handleInputChange}
                multiline
                rows={4}
                inputProps={{ maxLength: MAX_CONTENT_LENGTH }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={handleFormSubmit}>Save</Button>
            </DialogActions>
          </Dialog>

          <Notification
            open={notificationOpen}
            handleClose={closeNotification}
            alertMessage={notificationMessage}
            alertSeverity={notificationSeverity}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AboutSection2;
