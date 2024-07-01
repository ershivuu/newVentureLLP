import React, { useState, useEffect } from "react";
import { getAllFooterData, deleteFooterEmail } from "../../AdminServices";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TableContainer,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function FooterData() {
  const [footerData, setFooterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await getAllFooterData();
      setFooterData(response.data);
    } catch (error) {
      console.error("Error fetching footer data", error);
    }
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFooterEmail(deleteId);
      fetchFooterData();
      handleCloseDialog();
    } catch (error) {
      console.error(`Error deleting footer data with id ${deleteId}:`, error);
    }
  };

  const isValidData = (data) => Array.isArray(data) && data.length > 0;

  const filteredFooterData = footerData.filter(item => item.email !== null);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Footer Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isValidData(filteredFooterData) ? (
              filteredFooterData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.email}</TableCell>
                 
                  <TableCell>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDialog(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                  
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this email?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FooterData;
