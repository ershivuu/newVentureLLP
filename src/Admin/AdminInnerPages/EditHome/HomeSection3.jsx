import React, { useState, useEffect } from "react";
import {
  fetchHomeSectionThird,
  updateHomeSectionThird,
} from "../../AdminServices"; // Assuming your service file is named 'AdminServices.js'
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
import Notification from "../../../Notification/Notification";

function HomeSection3() {
  const [sectionData, setSectionData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newData, setNewData] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchHomeSectionThird();
      setSectionData(data);
      setNewData({
        heading: data.heading,
        content: data.content,
        sectionthird_img_first: null,
        sectionthird_img_second: null,
        sectionthird_img_third: null,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("heading", newData.heading);
      formData.append("content", newData.content);
      formData.append("sectionthird_img_first", newData.sectionthird_img_first);
      formData.append("sectionthird_img_second", newData.sectionthird_img_second);
      formData.append("sectionthird_img_third", newData.sectionthird_img_third);
  
      // File type validation
      if (
        newData.sectionthird_img_first &&
        !["image/jpeg", "image/jpg", "image/png"].includes(newData.sectionthird_img_first.type)
      ) {
        setNotificationMessage("Invalid file type. Please upload JPG, JPEG, or PNG.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }
  
      // File size validation (max size: 20 MB)
      if (
        newData.sectionthird_img_first &&
        newData.sectionthird_img_first.size > 20 * 1024 * 1024
      ) {
        setNotificationMessage("File size exceeds 20 MB limit.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }
  
      const response = await updateHomeSectionThird(sectionData.id, formData);
  
      if (response.status === 200) {
        // Display success notification
        setNotificationMessage(response.message); // Assuming your API response has a 'message' field
        setNotificationSeverity("success");
        setNotificationOpen(true);
        
        fetchData();
        handleCloseDialog();
      } else {
        // Handle other status codes or errors from the API
        setNotificationMessage("Error updating data");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // File type validation
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setNotificationMessage("Invalid file type. Please upload JPG, JPEG, or PNG.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      // File size validation (max size: 20 MB)
      if (file.size > 20 * 1024 * 1024) {
        setNotificationMessage("File size exceeds 20 MB limit.");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }
    }

    // Update the state with the selected file
    setNewData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Testimonial Section
      </Typography>
      {sectionData ? (
        <>
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
                  <TableCell>{sectionData.id}</TableCell>
                  <TableCell>{sectionData.heading}</TableCell>
                  <TableCell>{sectionData.content}</TableCell>
                  <TableCell>
                    <img
                      src={sectionData.sectionthird_img_first}
                      alt="Image 1"
                      style={{ width: 100 }}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={sectionData.sectionthird_img_second}
                      alt="Image 2"
                      style={{ width: 100 }}
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={sectionData.sectionthird_img_third}
                      alt="Image 3"
                      style={{ width: 100 }}
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
          {/* Dialog Box */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Edit Section 3</DialogTitle>
            <DialogContent>
              <TextField
                label="Heading"
                defaultValue={sectionData.heading}
                fullWidth
                variant="outlined"
                name="heading"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
              />
              <TextField
                label="Content"
                defaultValue={sectionData.content}
                fullWidth
                variant="outlined"
                name="content"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
              />
              <TextField
                type="file"
                name="sectionthird_img_first"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
                fullWidth
              />
              <TextField
                type="file"
                name="sectionthird_img_second"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
                fullWidth
              />
              <TextField
                type="file"
                name="sectionthird_img_third"
                onChange={handleInputChange}
                style={{ marginTop: 10 }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </>
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
    </Box>
  );
}

export default HomeSection3;
