import React, { useState, useEffect } from "react";
import { getAllFooterData, updateFooterData } from "../../AdminServices";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function EditFooter() {
  const [footerData, setFooterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFooter, setSelectedFooter] = useState(null);
  const [formData, setFormData] = useState({ footer_color: "", mobile: "" });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getAllFooterData();
        setFooterData(data.data);
      } catch (error) {
        console.error("Error fetching footer data", error);
      }
    };

    fetchFooterData();
  }, []);

  const handleClickOpen = (footer) => {
    setSelectedFooter(footer);
    setFormData({ footer_color: footer.footer_color, mobile: footer.mobile });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFooter(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateFooterData(selectedFooter.id, formData);
      // Refresh data
      const data = await getAllFooterData();
      setFooterData(data.data);
      handleClose();
    } catch (error) {
      console.error("Error updating footer data", error);
    }
  };

  const filteredData = footerData.filter((item) => item.id === 1);

  const isValidData = (data) => Array.isArray(data) && data.length > 0;

  return (
    <div>
      <h1>Footer Data</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Footer Color</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isValidData(filteredData) ? (
            filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.footer_color || "N/A"}</TableCell>
                <TableCell>{item.mobile || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickOpen(item)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Footer Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="footer_color"
            label="Footer Color"
            type="text"
            fullWidth
            value={formData.footer_color}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="mobile"
            label="Mobile"
            type="text"
            fullWidth
            value={formData.mobile}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditFooter;
