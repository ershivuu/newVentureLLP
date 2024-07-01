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
  Typography,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ChromePicker } from "react-color";
import Notification from "../../../Notification/Notification"; // Adjust the import path based on your file structure

function EditFooter() {
  const [footerData, setFooterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFooter, setSelectedFooter] = useState(null);
  const [formData, setFormData] = useState({ footer_color: "", mobile: "" });
  const [errors, setErrors] = useState({ footer_color: "", mobile: "" });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const fetchFooterData = async () => {
    try {
      const data = await getAllFooterData();
      setFooterData(data.data);
    } catch (error) {
      console.error("Error fetching footer data", error);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  const handleClickOpen = (footer) => {
    setSelectedFooter(footer);
    setFormData({ footer_color: footer.footer_color, mobile: footer.mobile });
    setErrors({ footer_color: "", mobile: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFooter(null);
    setErrors({ footer_color: "", mobile: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleColorChange = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      footer_color: color.hex,
    }));
    setErrors({ ...errors, footer_color: "" });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.footer_color) newErrors.footer_color = "Footer color is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateFooterData(selectedFooter.id, formData);
      setNotification({
        open: true,
        message: "Update successful!",
        severity: "success",
      });
      fetchFooterData();
      handleClose();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error updating footer data: " + error.message,
        severity: "error",
      });
      console.error("Error updating footer data:", error);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const filteredData = footerData.filter((item) => item.id === 1);

  const isValidData = (data) => Array.isArray(data) && data.length > 0;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Footer
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Footer Color</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isValidData(filteredData) ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        width: 50,
                        height: 30,
                        backgroundColor: item.footer_color || "N/A",
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.mobile || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<EditIcon />}
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
            <ChromePicker
              color={formData.footer_color}
              onChangeComplete={handleColorChange}
            />
            <TextField
              margin="dense"
              name="mobile"
              label="Mobile"
              type="text"
              fullWidth
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
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
      </TableContainer>
      <Notification
        open={notification.open}
        handleClose={handleNotificationClose}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </Box>
  );
}

export default EditFooter;
