import React, { useEffect, useState } from "react";
import {
  fetchContentWithSliderImages,
  addSliderImage,
  updateContentWithVideo,
  addContentWithVideo,
  deleteContainerData,
} from "../../AdminServices";
import "./UpcomingProjects.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Notification from "../../../Notification/Notification";

function SliderContent() {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [contentId, setContentId] = useState(null);
  const [deleteContentId, setDeleteContentId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("default");
  const [fileError, setFileError] = useState("");

  const [editFormData, setEditFormData] = useState({
    heading: "",
    content: "",
    video_link: "",
  });
  const [editFormErrors, setEditFormErrors] = useState({
    heading: "",
    content: "",
    video_link: "",
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    heading: "",
    content: "",
    video_link: "",
    slider_img: null,
  });

  const [addFormErrors, setAddFormErrors] = useState({
    heading: "",
    content: "",
    video_link: "",
    slider_img: "",
  });

  // const sliderImages=({
  //     display: 'flex',

  // })

  const getData = async () => {
    try {
      const result = await fetchContentWithSliderImages();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenDialog = (content_video_id) => {
    setSelectedItemId(content_video_id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
    getData(); // Refresh the data after closing the dialog
    setFileError("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

    if (file) {
      if (!allowedFormats.includes(file.type)) {
        setNotificationSeverity("error");
        setNotificationMessage("Only JPG, JPEG, and PNG formats are allowed.");
        setNotificationOpen(true);
        event.target.value = null; // Clear the input field
      } else if (file.size > maxSize) {
        setNotificationSeverity("error");
        setNotificationMessage("File size should be less than 20 MB.");
        setNotificationOpen(true);
        event.target.value = null; // Clear the input field
      } else {
        setFile(file);
        setFileError("");
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setFileError("This field is required");
      return;
    }
    const formData = new FormData();
    formData.append("slider_img", file);
    formData.append("content_video_id", selectedItemId);

    try {
      const response = await addSliderImage(formData);
      handleCloseDialog();
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use response message from API
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error adding slider image:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error adding slider image.");
      setNotificationOpen(true);
    }
  };

  const handleEditSubmit = async () => {
    const errors = {
      heading: editFormData.heading ? "" : "This field is required.",
      content: editFormData.content ? "" : "This field is required.",
      video_link: editFormData.video_link ? "" : "This field is required.",
    };

    setEditFormErrors(errors);

    if (errors.heading || errors.content || errors.video_link) {
      return; // Don't proceed if there are errors
    }

    try {
      const response = await updateContentWithVideo(contentId, editFormData);
      handleCloseEditDialog();
      getData();
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use response message from API
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating content:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error updating content.");
      setNotificationOpen(true);
    }
  };

  const handleOpenEditDialog = (item) => {
    setContentId(item.content_video_id);
    setEditFormData({
      heading: item.heading,
      content: item.content,
      video_link: item.video_link,
    });
    setEditFormErrors({
      heading: "",
      content: "",
      video_link: "",
      slider_img: "",
    });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddSubmit = async () => {
    const errors = {
      heading: addFormData.heading ? "" : "This field is required.",
      content: addFormData.content ? "" : "This field is required.",
      video_link: addFormData.video_link ? "" : "This field is required.",
      slider_img: addFormData.slider_img ? "" : "This field is required.",
    };

    setAddFormErrors(errors);

    if (
      errors.heading ||
      errors.content ||
      errors.video_link ||
      errors.slider_img
    ) {
      return; // Don't proceed if there are errors
    }

    const formData = new FormData();
    formData.append("heading", addFormData.heading);
    formData.append("content", addFormData.content);
    formData.append("video_link", addFormData.video_link);
    formData.append("slider_img", addFormData.slider_img);

    try {
      const response = await addContentWithVideo(formData);
      handleCloseAddDialog();
      getData();
      setNotificationSeverity("success");
      setNotificationMessage(response.message); // Use response message from API
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error adding new project:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error adding new project.");
      setNotificationOpen(true);
    }
  };

  const handleAddFormChange = (e) => {
    const { name, value, type, files } = e.target;

    // Clear the error for the field when typing
    setAddFormErrors({ ...addFormErrors, [name]: "" });
    if (e.target.name === "slider_img") {
      const file = e.target.files[0];
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

      if (!allowedFormats.includes(file.type)) {
        setNotificationSeverity("error");
        setNotificationMessage("Only JPG, JPEG, and PNG formats are allowed.");
        setNotificationOpen(true);
      } else if (file.size > maxSize) {
        setNotificationSeverity("error");
        setNotificationMessage("File size should be less than 20 MB.");
        setNotificationOpen(true);
      } else {
        setAddFormData({ ...addFormData, slider_img: file });
      }
    } else {
      setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
    }
  };

  const handleOpenDeleteDialog = (item) => {
    setDeleteContentId(item.content_video_id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteContainerData(deleteContentId);
      handleCloseDeleteDialog();
      getData();
      setNotificationSeverity("success");
      setNotificationMessage(response.message);
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error deleting content:", error);
      setNotificationSeverity("error");
      setNotificationMessage("Error deleting content.");
      setNotificationOpen(true);
    }
  };
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Project Content & Video
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
      >
        Add New Projects
      </Button>
      <Box className="set-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Container ID</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Video Link</TableCell>
                <TableCell>Slider Images</TableCell>
                <TableCell>Add Images</TableCell>
                <TableCell>Edit </TableCell>
                <TableCell>Delete </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.content_video_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.content_video_id}</TableCell>
                  <TableCell>{item.heading}</TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>
                    <a
                      href={item.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Video Link
                    </a>
                  </TableCell>
                  <TableCell>
                    {item.slider_images.map((image) => (
                      <div key={image.id} className="slider-image-container">
                        <img
                          src={image.slider_img_path}
                          alt={image.file_name}
                          style={{ width: "100px" }}
                          className="slider-image"
                        />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<AddPhotoAlternateIcon />}
                      onClick={() => handleOpenDialog(item.content_video_id)}
                      color="secondary"
                    >
                      Add Images
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEditDialog(item)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleOpenDeleteDialog(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* // add slider images  */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Slider Image</DialogTitle>

        <DialogContent>
          <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            error={Boolean(fileError)}
            helperText={fileError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* //edit dialog box  */}

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Content</DialogTitle>
        <DialogContent>
          <TextField
            label="Heading"
            autoFocus
            margin="dense"
            name="heading"
            type="text"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={editFormData.heading}
            onChange={(e) => {
              setEditFormData({ ...editFormData, heading: e.target.value });
              // Clear error for this field when typing
              setEditFormErrors({ ...editFormErrors, heading: "" });
            }}
            error={Boolean(editFormErrors.heading)}
            helperText={editFormErrors.heading}
          />
          <TextField
            label="Content"
            autoFocus
            margin="dense"
            name="heading"
            type="text"
            fullWidth
            value={editFormData.content}
            onChange={(e) => {
              setEditFormData({ ...editFormData, content: e.target.value });
              setEditFormErrors({ ...editFormErrors, content: "" });
            }}
            id="outlined-basic"
            variant="outlined"
            error={Boolean(editFormErrors.content)}
            helperText={editFormErrors.content}
          />
          <TextField
            label="Video Link"
            autoFocus
            margin="dense"
            name="heading"
            type="text"
            fullWidth
            value={editFormData.video_link}
            onChange={(e) => {
              setEditFormData({ ...editFormData, video_link: e.target.value });
              setEditFormErrors({ ...editFormErrors, video_link: "" });
            }}
            id="outlined-basic"
            variant="outlined"
            error={Boolean(editFormErrors.video_link)}
            helperText={editFormErrors.video_link}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* // add new project  */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            name="heading"
            label="Heading"
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={addFormData.heading}
            onChange={handleAddFormChange}
            id="outlined-basic"
            variant="outlined"
            error={Boolean(addFormErrors.heading)}
            helperText={addFormErrors.heading}
          />
          <TextField
            name="content"
            label="Content"
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={addFormData.content}
            onChange={handleAddFormChange}
            id="outlined-basic"
            error={Boolean(addFormErrors.content)}
            helperText={addFormErrors.content}
            variant="outlined"
          />
          <TextField
            name="video_link"
            label="Video Link"
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={addFormData.video_link}
            onChange={handleAddFormChange}
            id="outlined-basic"
            variant="outlined"
            error={Boolean(addFormErrors.video_link)}
            helperText={addFormErrors.video_link}
          />
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            type="file"
            accept="image/*"
            name="slider_img"
            onChange={handleAddFormChange}
            error={!!addFormErrors.slider_img}
            helperText={addFormErrors.slider_img}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* //delete project  */}

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
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

export default SliderContent;
