// src/pages/Gallery/GalleryTable.js
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
} from "@mui/material";
import { getGalleryBanner, updateGalleryBanner } from "../../AdminServices";

const EditGalleryBanner = () => {
  const [banner, setBanner] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({
    id: null,
    heading: "",
    banner_img: "",
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
      const updatedData = {
        heading: selectedBanner.heading,
        banner_img: selectedBanner.banner_img,
      };
      await updateGalleryBanner(selectedBanner.id, updatedData);
      setBanner(
        banner.map((item) =>
          item.id === selectedBanner.id ? selectedBanner : item
        )
      );
      setOpen(false);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBanner({ ...selectedBanner, [name]: value });
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
          <TextField
            margin="dense"
            type="file"
            fullWidth
            name="banner_img"
            onChange={(e) =>
              handleChange({
                target: { name: "banner_img", value: e.target.files[0] },
              })
            }
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
