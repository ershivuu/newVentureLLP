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

  const handleSave = async () => {
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

      await updateHomeSectionFirst(data.id, formData, updatedData);

      const response = await updateHomeSectionFirst(
        data.id,
        formData,
        updatedData
      );
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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit About Section
      </Typography>
      {data ? (
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
              />
              <TextField
                label="Content"
                fullWidth
                multiline
                margin="dense"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Typography>Image 1</Typography>
              <TextField
                fullWidth
                type="file"
                margin="dense"
                onChange={(e) => setImage1(e.target.files[0])}
              />
              <Typography>Image 2</Typography>
              <TextField
                fullWidth
                margin="dense"
                type="file"
                onChange={(e) => setImage2(e.target.files[0])}
              />
              <Typography>Image 3</Typography>
              <TextField
                fullWidth
                margin="dense"
                type="file"
                onChange={(e) => setImage3(e.target.files[0])}
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
      ) : (
        <Typography variant="body1">No data found</Typography>
      )}
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
