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
  IconButton,
  Typography,
  Box
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { ChromePicker } from 'react-color';

const EditHome = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    head_color: '',
    banner_img_path: '',
    banner_img: null
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      banner_img: file
    }));
  };

  const handleColorChange = (color) => {
    setFormData((prevState) => ({
      ...prevState,
      head_color: color.hex
    }));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('head_color', formData.head_color);
    if (formData.banner_img) {
      formDataToSend.append('banner_img', formData.banner_img);
    }

    try {
      await updateHomeData(data.id, formDataToSend);
      setData((prevData) => ({
        ...prevData,
        ...formData,
        banner_img_path: formData.banner_img ? URL.createObjectURL(formData.banner_img) : prevData.banner_img_path
      }));
      handleClose();
    } catch (error) {
      console.error('Error updating home data:', error);
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
              <div style={{ width: 50, height: 30, backgroundColor: data.head_color,  }} />
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
        <DialogTitle variant='h5'>Edit Home </DialogTitle>
        <DialogContent>
    
        <Typography variant="h6" gutterBottom >
            Update Header Color
          </Typography>
            <ChromePicker color={formData.head_color} onChange={handleColorChange} />
          
          <Typography variant="h6" gutterBottom>
            Banner Image
          </Typography>
          <TextField
            margin="dense"
            name="banner_img"
            // label="Banner Image"
            type="file"
            fullWidth
            onChange={handleFileChange}
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
    </TableContainer>
    </Box>
  
  );
};

export default EditHome;
