import React, { useEffect, useState } from 'react';
import { getHomeData, updateHomeData } from '../../AdminServices';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { ChromePicker } from 'react-color';
import Notification from '../../../Notification/Notification'; // Adjust the import path as needed

const EditHome = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    head_color: '',
    banner_img_path: '',
    banner_img: null
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [fileError, setFileError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHomeData();
        setData(result.data);
        setFormData({
          head_color: result.data.head_color,
          banner_img_path: result.data.banner_img_path,
          banner_img: null
        });
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationClose = () => {
    setNotification((prevState) => ({ ...prevState, open: false }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 20 * 1024 * 1024; // 20 MB

    if (file) {
      if (!allowedFormats.includes(file.type)) {
        setNotification({
          open: true,
          message: 'Only JPG, JPEG, and PNG formats are allowed.',
          severity: 'error'
        });
      } else if (file.size > maxSize) {
        setNotification({
          open: true,
          message: 'Image size should not exceed 20 MB.',
          severity: 'error'
        });
      } else {
        setFormData((prevState) => ({
          ...prevState,
          banner_img: file
        }));
        setFileError('');
      }
    }
  };

  const handleColorChange = (color) => {
    setFormData((prevState) => ({
      ...prevState,
      head_color: color.hex
    }));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
  
    // Update only if the header color was changed
    if (formData.head_color !== data.head_color) {
      formDataToSend.append('head_color', formData.head_color);
    }
  
    // Update only if a new banner image was selected and there are no file errors
    if (formData.banner_img && !fileError) {
      formDataToSend.append('banner_img', formData.banner_img);
    }
  
    // Check if any updates were made
    if (formDataToSend.has('head_color') || formDataToSend.has('banner_img')) {
      try {
        const response = await updateHomeData(data.id, formDataToSend);
        if (formDataToSend.has('head_color')) {
          setData((prevData) => ({
            ...prevData,
            head_color: formData.head_color
          }));
        }
        if (formDataToSend.has('banner_img')) {
          setData((prevData) => ({
            ...prevData,
            banner_img_path: URL.createObjectURL(formData.banner_img)
          }));
        }
        handleClose();
        setNotification({
          open: true,
          message: response.message,
          severity: 'success'
        });
      } catch (error) {
        console.error('Error updating home data:', error);
        setNotification({
          open: true,
          message: 'Failed to update home data',
          severity: 'error'
        });
      }
    } else {
      setFileError(formDataToSend.has('banner_img') ? '' : 'No changes were made.');
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Home Section
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Header Color</TableCell>
              <TableCell>Banner Image</TableCell>
              <TableCell>Banner Image Original Name</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.id}</TableCell>
              <TableCell>
                <div style={{ width: 50, height: 30, backgroundColor: data.head_color }} />
              </TableCell>
              <TableCell>
                <img src={data.banner_img_path} alt={data.banner_img_originalname} width="100" />
              </TableCell>
              <TableCell>{data.banner_img_originalname}</TableCell>
              <TableCell>
                <Button startIcon={<EditIcon />} onClick={handleClickOpen}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle variant='h5'>Edit Home</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Update Header Color
            </Typography>
            <ChromePicker color={formData.head_color} onChange={handleColorChange} />

            <Typography variant="h6" gutterBottom>
              Banner Image
            </Typography>
            <TextField
              margin="dense"
              name="banner_img"
              type="file"
              fullWidth
              onChange={handleFileChange}
            />
            {fileError && <Typography color="error">{fileError}</Typography>}
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
      </TableContainer>

      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Box>
  );
};

export default EditHome;
