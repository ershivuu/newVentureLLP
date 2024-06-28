import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import {
  getHomeSectionFirst,
  updateHomeSectionFirst,
} from "../../AdminServices";
import EditIcon from "@mui/icons-material/Edit";
import Notification from "../../../Notification/Notification";

const HomeSection1 = () => {
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false); // Notification state
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getHomeSectionFirst();
        setData(fetchedData);
        setHeading(fetchedData.heading);
        setContent(fetchedData.content);
        setImage1(null);
        setImage2(null);
        setImage3(null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (rowData) => {
    setOpenDialog(true);
    setHeading(rowData.heading);
    setContent(rowData.content);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 20 * 1024 * 1024; // 20 MB

    if (!validTypes.includes(file.type)) {
      setNotificationMessage("Only JPG, JPEG, and PNG formats are allowed.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return false;
    }

    if (file.size > maxSize) {
      setNotificationMessage("File size should not exceed 20 MB.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return false;
    }

    return true;
  };

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file && validateImage(file)) {
      setImage(file);
    } else {
      event.target.value = null; // Clear the input if validation fails
    }
  };

  const handleSave = async () => {
    // Check if heading or content is empty
    if (!heading.trim() || !content.trim()) {
      setNotificationMessage("Heading and Content cannot be empty.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }
  
    // Validate images
    if (
      (image1 && !validateImage(image1)) ||
      (image2 && !validateImage(image2)) ||
      (image3 && !validateImage(image3))
    ) {
      return; // Prevent form submission if any image is invalid
    }
  
    try {
      const formData = new FormData();
      formData.append("heading", heading); // Append heading to FormData
      formData.append("content", content); // Append content to FormData
      formData.append("img_first", image1);
      formData.append("img_second", image2);
      formData.append("img_third", image3);
  
      const updatedData = {
        id: data.id,
        heading,
        content,
      };
  
      const response = await updateHomeSectionFirst(data.id, formData, updatedData);
      handleCloseDialog();
  
      const fetchedData = await getHomeSectionFirst();
      setData(fetchedData);
      setHeading(fetchedData.heading);
      setContent(fetchedData.content);
      setImage1(null);
      setImage2(null);
      setImage3(null);
  
      setNotificationMessage(response.message); // Assuming your API response has a 'message' field
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage("Error updating data");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };
  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit About Section
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.heading}</TableCell>
              <TableCell>{data.content}</TableCell>
              <TableCell>
                <img
                  src={data.img_first}
                  alt="Image 1"
                  style={{ width: 100 }}
                />
                {/* <div>{data.img_first_originalname}</div>   */}
              </TableCell>
              <TableCell>
                <img
                  src={data.img_second}
                  alt="Image 2"
                  style={{ width: 100 }}
                />
                {/* <div>{data.img_second_originalname}</div> */}
              </TableCell>
              <TableCell>
                <img
                  src={data.img_third}
                  alt="Image 3"
                  style={{ width: 100 }}
                />
                {/* <div>{data.img_third_originalname}</div> */}
              </TableCell>
              <TableCell>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog(data)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Section 1</DialogTitle>
          <DialogContent>
            <TextField
              label="Heading"
              fullWidth
              value={heading}
              margin="dense"
              onChange={(e) => setHeading(e.target.value)}
              error={!heading.trim()} // Check if heading is empty
              helperText={!heading.trim() ? "Heading cannot be empty" : ""}
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              margin="dense"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={!content.trim()} // Check if content is empty
              helperText={!content.trim() ? "Content cannot be empty" : ""}
            />
            <Typography>Image 1</Typography>
            <TextField
              fullWidth
              type="file"
              margin="dense"
              onChange={(e) => handleFileChange(e, setImage1)}
            />
            <Typography>Image 2</Typography>
            <TextField
              fullWidth
              margin="dense"
              type="file"
              onChange={(e) => handleFileChange(e, setImage2)}
            />
            <Typography>Image 3</Typography>
            <TextField
              fullWidth
              margin="dense"
              type="file"
              onChange={(e) => handleFileChange(e, setImage3)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
      <Notification
        open={notificationOpen}
        handleClose={() => setNotificationOpen(false)}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Box>
  );
};

export default HomeSection1;
