import React, { useEffect, useState } from 'react';
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Input
} from '@mui/material';
import { getContactPageData, updateContactPageData } from '../../AdminServices'; // Adjust the import path based on your file structure
import EditIcon from "@mui/icons-material/Edit";

function EditContactUs() {
  const [contactData, setContactData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
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
      banner_img: '',
      email: data.email,
      phone: data.phone
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      id: '',
      heading: '',
      banner_img: '',
      email: '',
      phone: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, banner_img: e.target.files[0] });
  };

  const handleFormSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('heading', formData.heading);
      if (formData.banner_img) {
        formDataToSend.append('banner_img', formData.banner_img);
      }
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);

      await updateContactPageData(formData.id, formDataToSend);
      handleClose();
      fetchContactData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <h2>Contact Page Data</h2>
      {contactData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
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
                  <img src={contactData.banner_img} alt="Banner" style={{ maxWidth: '100px',maxHeight:"100px" }} />
                </TableCell>
                <TableCell>{contactData.email}</TableCell>
                <TableCell>{contactData.phone}</TableCell>
                <TableCell>
                  <Button startIcon={<EditIcon />} onClick={() => handleClickOpen(contactData)}>Edit</Button>
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
          />
          <TextField
            margin="dense"
            name="banner_img"
            type="file"
            fullWidth
            onChange={handleFileChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
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
    </div>
  );
}

export default EditContactUs;
