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
} from "@mui/material";
import { getGalleryBanner, updateGalleryBanner } from "../../AdminServices";

const EditGalleryBanner = () => {
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({
    id: null,
    heading: "",
    banner_img: null, // Changed from "" to null
  });

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
      if (selectedBanner.banner_img) {
        formData.append("banner_img", selectedBanner.banner_img);
      }

      await updateGalleryBanner(selectedBanner.id, formData);

      // Update the state with the new data
      setBanner((prevBanner) =>
        prevBanner.map((item) =>
          item.id === selectedBanner.id
            ? { ...item, heading: selectedBanner.heading, banner_img: URL.createObjectURL(selectedBanner.banner_img) }
            : item
        )
      );

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Heading</TableCell>
              <TableCell>Banner Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banner.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.heading}</TableCell>
                <TableCell>
                  <img
                    src={row.banner_img_url}
                    alt={row.original_name}
                    width="100"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(row)}
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
            autoFocus
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            name="heading"
            value={selectedBanner.heading}
            onChange={handleChange}
          />
          <Input
            margin="dense"
            type="file"
            fullWidth
            name="banner_img"
            onChange={handleChange}
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
    </>
  );
};

export default EditGalleryBanner;
