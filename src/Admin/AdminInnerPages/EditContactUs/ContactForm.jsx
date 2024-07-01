import React, { useEffect, useState } from "react";
import { getContactFormData, deleteContactFormData } from "../../AdminServices";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ContactForm() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const data = await getContactFormData();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContactFormData(id);
      // Fetch the updated data after deletion
      fetchFormData();
    } catch (error) {
      console.error(`Error deleting form data with id ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Contact Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>

              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>

                <TableCell>{item.comment}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ContactForm;
