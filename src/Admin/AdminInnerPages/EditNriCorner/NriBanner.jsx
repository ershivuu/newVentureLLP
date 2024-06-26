import React, { useEffect, useState } from "react";
import {
  Button,
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
  TextField,
} from "@mui/material";
import { getNriPageData, updateNriPageData } from "../../AdminServices"; // Assuming your service file is in the same directory
import EditIcon from "@mui/icons-material/Edit";

function NriBanner() {
  const [nriData, setNriData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    banner_heading: "",
    banner_img: null,
    section_one_heading: "",
    section_one_content: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getNriPageData();
    setNriData(data);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
    setFormData({
      banner_heading: nriData.banner_heading,
      banner_img: null,
      section_one_heading: nriData.section_one_heading,
      section_one_content: nriData.section_one_content,
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner_img") {
      const file = files.length > 0 ? files[0] : null;
      setFormData((prevData) => ({
        ...prevData,
        banner_img: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", nriData.id);
      formDataToSend.append("banner_heading", formData.banner_heading);
      formDataToSend.append("banner_img", formData.banner_img);
      formDataToSend.append(
        "section_one_heading",
        formData.section_one_heading
      );
      formDataToSend.append(
        "section_one_content",
        formData.section_one_content
      );

      await updateNriPageData(formDataToSend);
      handleCloseEditDialog();
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <h2>Edit NRI Page</h2>
      {nriData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Banner Heading</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Section One Heading</TableCell>
                <TableCell>Section One Content</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>{nriData.banner_heading}</TableCell>
                <TableCell>
                  <img
                    style={{ maxWidth: "100px" }}
                    src={nriData.banner_img}
                    alt="Banner Image"
                  />
                </TableCell>
                <TableCell>{nriData.section_one_heading}</TableCell>
                <TableCell>{nriData.section_one_content}</TableCell>
                <TableCell>
                  <Button startIcon={<EditIcon />} onClick={handleEditClick}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Loading...</p>
      )}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit NRI Page Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Banner Heading"
            name="banner_heading"
            value={formData.banner_heading}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
          />
          <TextField
            type="file"
            name="banner_img"
            accept="image/*"
            onChange={handleFormChange}
            margin="dense"
            fullWidth
          />
          <TextField
            margin="dense"
            label="Section One Heading"
            name="section_one_heading"
            value={formData.section_one_heading}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Section One Content"
            name="section_one_content"
            value={formData.section_one_content}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NriBanner;
