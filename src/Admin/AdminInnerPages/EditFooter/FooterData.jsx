import React, { useState, useEffect } from "react";
import { getAllFooterData, deleteFooterEmail } from "../../AdminServices"; // Import deleteFooterEmail function from your AdminServices
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function FooterData() {
  const [footerData, setFooterData] = useState([]);

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

  const handleDelete = async (id) => {
    try {
      await deleteFooterEmail(id); // Call your deleteFooterEmail function here passing the 'id'
      fetchFooterData(); // Refetch data after successful deletion
    } catch (error) {
      console.error(`Error deleting footer data with id ${id}:`, error);
    }
  };

  const isValidData = (data) => Array.isArray(data) && data.length > 0;

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
              <TableCell>Action</TableCell> {/* New header for delete action */}
            </TableRow>
          </TableHead>
          <TableBody>
            {isValidData(footerData) ? (
              footerData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {item.id !== 1 && (
                      <IconButton
                        onClick={() => handleDelete(item.id)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
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
    </Box>
  );
}

export default FooterData;
