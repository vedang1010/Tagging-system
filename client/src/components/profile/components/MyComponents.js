// src/components/MyComponents.js
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, Button } from '@mui/material';
import {useNavigate} from "react-router-dom"
import HtmlRenderer from '../../../utils/HtmlRenderer';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const MyComponents = ({ components }) => {
  console.log(components);
  const naviagte=useNavigate()
const handleUploadComponent=(id)=>{
  console.log(id)
  naviagte(`/modify/${id}`)

}
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Components
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Component Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Status 1</StyledTableCell>
              <StyledTableCell>Upload Component</StyledTableCell>
              <StyledTableCell>Status 2</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{<HtmlRenderer htmlString={component.description.short} />}</TableCell>
                <TableCell>{component.status1}</TableCell>
                <TableCell>
                <Button onClick={() => handleUploadComponent(component._id)}>
                
                 upload component</Button></TableCell>
                <TableCell>{component.status2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyComponents;
