import React, { useState, useEffect } from "react";
import { getAllFooterData } from "../../AdminServices";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TableContainer,
  Paper
} from "@mui/material";

function FooterData() {
  const [footerData, setFooterData] = useState([]);

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

  const isValidData = (data) => Array.isArray(data) && data.length > 0;
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>Footer Data</Typography>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {/* <TableCell>Footer Color</TableCell> */}
            <TableCell>Email</TableCell>
            {/* <TableCell>Mobile</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {isValidData(footerData) ? (
            footerData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                {/* <TableCell>{item.footer_color || "N/A"}</TableCell> */}
                <TableCell>{item.email}</TableCell>
                {/* <TableCell>{item.mobile || "N/A"}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </TableContainer>
    </Box>
  );
}

export default FooterData;
