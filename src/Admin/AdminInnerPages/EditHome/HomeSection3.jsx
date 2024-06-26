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
  Input,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function HomeSection3() {
  const [sectionData, setSectionData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newData, setNewData] = useState({}); // State to store updated data

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
      formData.append(
        "sectionthird_img_second",
        newData.sectionthird_img_second
      );
      formData.append("sectionthird_img_third", newData.sectionthird_img_third);

      await updateHomeSectionThird(sectionData.id, formData);

      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
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
    </Box>
  );
}

export default HomeSection3;
