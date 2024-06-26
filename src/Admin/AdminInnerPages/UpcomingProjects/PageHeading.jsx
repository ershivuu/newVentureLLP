import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  getAllSectionFirst,
  updateSectionFirstContent,
} from "../../AdminServices";
import Notification from "../../../Notification/Notification";

function PageHeading() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    heading: "",
    content: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ heading: "", content: "" });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllSectionFirst();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = (section) => {
    setEditData(section);
    setFieldErrors({ heading: "", content: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "heading" && value.length > 20) {
      setFieldErrors({
        ...fieldErrors,
        heading: "Maximum 20 characters allowed",
      });
      return;
    }

    if (name === "content" && value.length > 100) {
      setFieldErrors({
        ...fieldErrors,
        content: "Maximum 100 characters allowed",
      });
      return;
    }

    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateFields = () => {
    const errors = { heading: "", content: "" };
    let isValid = true;

    if (!editData.heading) {
      errors.heading = "This field is required";
      isValid = false;
    }
    if (!editData.content) {
      errors.content = "This field is required";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const updatedData = {
        id: editData.id,
        content: editData.content,
        heading: editData.heading,
      };
      const response = await updateSectionFirstContent(
        editData.id,
        updatedData
      );
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id
            ? { ...item, content: editData.content, heading: editData.heading }
            : item
        )
      );

      setNotification({
        open: true,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: `Error updating data: ${error.message}`,
        severity: "error",
      });
      setError(error.message);
    } finally {
      handleClose();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }
  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + "...";
    }
    return text;
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Page Heading
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.id}</TableCell>
                <TableCell>{section.heading}</TableCell>
                <TableCell>{truncateText(section.content)}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleClickOpen(section)}
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
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit this section, please modify the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="heading"
            label="Heading"
            type="text"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={editData.heading}
            onChange={handleChange}
            error={Boolean(fieldErrors.heading)}
            helperText={fieldErrors.heading}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            id="outlined-basic"
            variant="outlined"
            value={editData.content}
            onChange={handleChange}
            error={Boolean(fieldErrors.content)}
            helperText={fieldErrors.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        handleClose={() => setNotification({ ...notification, open: false })}
        alertMessage={notification.message}
        alertSeverity={notification.severity}
      />
    </div>
  );
}

export default PageHeading;
