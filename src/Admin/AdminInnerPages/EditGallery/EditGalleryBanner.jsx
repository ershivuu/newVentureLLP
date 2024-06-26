import React, { useEffect, useState } from "react";
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
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
  Box,
  Typography
} from "@mui/material";
import { getGalleryBanner, updateGalleryBanner } from "../../AdminServices";
import EditIcon from '@mui/icons-material/Edit';

const EditGalleryBanner = () => {
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({
    id: null,
    heading: "",
    banner_img: null, // Changed from "" to null
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getGalleryBanner();
        setBanner([data]);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("heading", selectedBanner.heading);
      if (file) {
        formData.append("banner_img", file);
      }
      await updateGalleryBanner(selectedBanner.id, formData);
      const updatedBanner = await getGalleryBanner();
      setBanner([updatedBanner]);
      setOpen(false);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSelectedBanner({ ...selectedBanner, [name]: files[0] });
    } else {
      setSelectedBanner({ ...selectedBanner, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
    <Box>
    <Typography variant="h4" component="h1" gutterBottom>
     Edit Banner
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Banner Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banner.map((item,index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.heading}</TableCell>
                <TableCell>
                  <img
                    src={item.banner_img_url}
                    alt={item.original_name}
                    width="100"
                  />
                </TableCell>
                <TableCell>
                  <Button
                  startIcon={<EditIcon />}
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Banner</DialogTitle>
        <DialogContent>
          <TextField
           
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            name="heading"
            value={selectedBanner.heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            type="file"
            fullWidth
            name="banner_img"
            onChange={handleFileChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    
    </>
  );
};

export default EditGalleryBanner;
