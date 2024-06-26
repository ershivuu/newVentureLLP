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
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
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
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={formData.content}
            onChange={handleInputChange}
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
    </Box>
  );
}

export default AboutSection1;
