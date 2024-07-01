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
import Notification from "../../../Notification/Notification"; // Path to your Notification component

function NriBanner() {
  const [nriData, setNriData] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    banner_heading: "",
    banner_img: null,
    section_one_heading: "",
    section_one_content: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

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
      banner_img:null,
      section_one_heading: nriData.section_one_heading,
      section_one_content: nriData.section_one_content,
    });
    setFormErrors({});
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear any existing error for this field
    }));

    if (name === "banner_img") {
      const file = files.length > 0 ? files[0] : null;
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        const maxSizeInBytes = 20 * 1024 * 1024; // 20 MB in bytes

        if (!validTypes.includes(file.type)) {
          setNotificationMessage("Only JPG, JPEG, and PNG files are allowed");
          setNotificationSeverity("error");
          setNotificationOpen(true);
          return;
        }

        if (file.size > maxSizeInBytes) {
          setNotificationMessage("File size exceeds 20 MB");
          setNotificationSeverity("error");
          setNotificationOpen(true);
          return;
        }
      }
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
    const errors = {};
    if (!formData.banner_heading)
      errors.banner_heading = "This field is required";
    if (!formData.section_one_heading)
      errors.section_one_heading = "This field is required";
    if (!formData.section_one_content)
      errors.section_one_content = "This field is required";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Validate file again before submission
    if (formData.banner_img) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInBytes = 20 * 1024 * 1024; // 20 MB in bytes

      if (!validTypes.includes(formData.banner_img.type)) {
        setNotificationMessage("Only JPG, JPEG, and PNG files are allowed");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      if (formData.banner_img.size > maxSizeInBytes) {
        setNotificationMessage("File size exceeds 20 MB");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", nriData.id);
      formDataToSend.append("banner_heading", formData.banner_heading);
      if (formData.banner_img) {
        formDataToSend.append("banner_img", formData.banner_img);
      }
      formDataToSend.append(
        "section_one_heading",
        formData.section_one_heading
      );
      formDataToSend.append(
        "section_one_content",
        formData.section_one_content
      );

      const response = await updateNriPageData(formDataToSend);
      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);

      handleCloseEditDialog();
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      setNotificationMessage(
        error.response?.data?.message || "Error updating data"
      );
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
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
            error={!!formErrors.banner_heading}
            helperText={formErrors.banner_heading}
          />
          <TextField
            type="file"
            name="banner_img"
            accept="image/*"
            onChange={handleFormChange}
            margin="dense"
            fullWidth
            error={!!formErrors.banner_img}
            helperText={formErrors.banner_img}
          />
          <TextField
            label="Section One Heading"
            name="section_one_heading"
            value={formData.section_one_heading}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
            error={!!formErrors.section_one_heading}
            helperText={formErrors.section_one_heading}
          />
          <TextField
            label="Section One Content"
            name="section_one_content"
            value={formData.section_one_content}
            onChange={handleFormChange}
            fullWidth
            margin="dense"
            error={!!formErrors.section_one_content}
            helperText={formErrors.section_one_content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default NriBanner;
