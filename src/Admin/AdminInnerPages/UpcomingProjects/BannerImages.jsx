import React, { useState, useEffect } from 'react';
import { getAllBannerImages,updateBannerImage } from '../../AdminServices';
import {
    Table,
    TableBody,
    TableCell,

    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,

    DialogTitle,
    TextField
  } from '@mui/material';

function BannerImages() {
    const [bannerImages, setBannerImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editImageId, setEditImageId] = useState(null);
    const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const images = await getAllBannerImages();
        console.log(">>>>",images[0].banner_images)
        setBannerImages(images[0].banner_images);
        setLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        setError(error.message);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleUpdateImage = async () => {
    try {
      await updateBannerImage(editImageId, file);
      const updatedImages = await getAllBannerImages();
      setBannerImages(updatedImages[0].banner_images);
      setOpenEditDialog(false);
      setEditImageId(null);
      setFile(null);
    } catch (error) {
      setError(error.message);
    }
  };    

  const handleClickOpenEditDialog = (imageId) => {
    setEditImageId(imageId);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditImageId(null);
    setFile(null);
  };



  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image Name</TableCell>
            <TableCell>Image Path</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bannerImages&&bannerImages.map((item,index) => (
            <TableRow key={item.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{item.img_name}</TableCell>
              <TableCell>
                <img src={item.img_path} alt={item.img_name} style={{ maxWidth: '100px' }} />
              </TableCell>
              <TableCell>
                <Button  onClick={() => handleClickOpenEditDialog(item.id)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Banner Image</DialogTitle>
        <DialogContent>
          <TextField type="file" onChange={handleFileChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateImage} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default BannerImages;
