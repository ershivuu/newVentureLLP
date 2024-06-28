import React, { useEffect, useState } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import { getContactPageData, updateContactPageData } from '../../AdminServices'; // Adjust the import path based on your file structure
import EditIcon from "@mui/icons-material/Edit";
import Notification from '../../../Notification/Notification'; // Adjust the import path based on your file structure

function EditContactUs() {
  const [contactData, setContactData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    heading: "",
    banner_img: "",
    email: "",
    phone: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: ''
  });
  const [errors, setErrors] = useState({
    heading: '',
    banner_img: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    const data = await getContactPageData();
    setContactData(data);
  };

  const handleClickOpen = (data) => {
    setFormData({
      id: data.id,
      heading: data.heading,
      banner_img: "",
      email: data.email,
      phone: data.phone,
    });
    setErrors({
      heading: '',
      banner_img: '',
      email: '',
      phone: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: "",
      heading: "",
      banner_img: "",
      email: "",
      phone: "",
    });
    setErrors({
      heading: '',
      banner_img: '',
      email: '',
      phone: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, banner_img: e.target.files[0] });
    setErrors({ ...errors, banner_img: '' });
  };

  const handleFormSubmit = async () => {
    const newErrors = {};
    if (!formData.heading) newErrors.heading = 'Heading is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("heading", formData.heading);
      if (formData.banner_img) {
        formDataToSend.append("banner_img", formData.banner_img);
      }
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);

      const response = await updateContactPageData(formData.id, formDataToSend);
      setNotification({
        open: true,
        message: response.message || 'Update successful!',
        severity: 'success'
      });
      handleClose();
      fetchContactData();
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error updating data: ' + error.message,
        severity: 'error'
      });
      console.error('Error updating data:', error);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div>
      <h2>Edit Contact Page</h2>
      {contactData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Banner Image</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={contactData.id}>
                <TableCell>{contactData.id}</TableCell>
                <TableCell>{contactData.heading}</TableCell>
                <TableCell>
                  <img src={contactData.banner_img} alt="Banner" style={{ maxWidth: '100px', maxHeight: "100px" }} />
                </TableCell>
                <TableCell>{contactData.email}</TableCell>
                <TableCell>{contactData.phone}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleClickOpen(contactData)}
                  >
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Contact Information</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            value={formData.heading}
            onChange={handleChange}
            error={!!errors.heading}
            helperText={errors.heading}
          />
          <TextField
            margin="dense"
            name="banner_img"
            type="file"
            fullWidth
            onChange={handleFileChange}
            error={!!errors.banner_img}
            helperText={errors.banner_img}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default EditContactUs;
