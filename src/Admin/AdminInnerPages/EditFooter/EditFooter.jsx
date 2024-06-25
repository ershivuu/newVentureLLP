import React, { useState, useEffect } from 'react';
import { getAllFooterData } from '../../AdminServices';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function EditFooter() {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFooterData();
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Edit Footer</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Footer Color</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {footerData && footerData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.footer_color}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.mobile}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EditFooter;
   