import React, { useState, useEffect } from "react";
import { getAllFooterData } from "../../AdminServices";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function EditFooter() {
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

  // Filter the footerData to only include the item with id 1
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
          </TableRow>
        </TableHead>
        <TableBody>
          {isValidData(filteredData) ? (
            filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.footer_color || "N/A"}</TableCell>
                <TableCell>{item.mobile || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EditFooter;
