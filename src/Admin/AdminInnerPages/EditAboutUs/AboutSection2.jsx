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
  };

  const handleFormSubmit = async () => {
    // Call your update API here with formData
    await updateAboutUsSectionSecond(formData);
    // Close the dialog after submitting
    setOpenDialog(false);
    // Refetch data to update the table
    const updatedData = await getAboutUsSectionSecond();
    setAboutData(updatedData);
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
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content First"
                name="content_first"
                value={formData.content_first}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Heading Second"
                name="heading_second"
                value={formData.heading_second}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Content Second"
                name="content_second"
                value={formData.content_second}
                onChange={handleInputChange}
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
    </div>
  );
}

export default AboutSection2;
