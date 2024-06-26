// src/MainHeadingTable.js
import React, { useState, useEffect } from "react";
import { getAllGalleryImages, updateMainHeading } from "../../AdminServices";
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

const EditGalleryHeading = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState({
    id: null,
    main_heading: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllGalleryImages();
      setGalleryImages(data);
    };

    fetchData();
  }, []);

  const handleEditClick = (id, main_heading) => {
    setSelectedHeading({ id, main_heading });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await updateMainHeading(selectedHeading.id, selectedHeading.main_heading);
    setGalleryImages(
      galleryImages.map((item) =>
        item.main_table_id === selectedHeading.id
          ? { ...item, main_heading: selectedHeading.main_heading }
          : item
      )
    );
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelectedHeading({ ...selectedHeading, main_heading: e.target.value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr.No</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleryImages.map((row, index) => (
              <TableRow key={row.main_table_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.main_heading}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleEditClick(row.main_table_id, row.main_heading)
                    }
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
        <DialogTitle>Edit Main Heading</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Main Heading"
            type="text"
            fullWidth
            value={selectedHeading.main_heading}
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

export default EditGalleryHeading;
