// src/components/MyComponents.js
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import HtmlRenderer from '../../../utils/HtmlRenderer';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#0a1324',
  color: theme.palette.common.white,
}));
// sx={{ backgroundColor: '#0a1324', color: '#fff' }} 
const MyComponents = ({ components }) => {
  console.log(components);
  const naviagte = useNavigate()
  const handleUploadComponent = (id) => {
    console.log(id)
    naviagte(`/modify/${id}`)

  }
  const handleViewComponent = (id) => {
    console.log(id)
    naviagte(`/component/${id}`)

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
              <StyledTableCell>Status 2</StyledTableCell>
              <StyledTableCell>Component</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{<HtmlRenderer htmlString={component.description.short} />}</TableCell>
                <TableCell>{component.status1}</TableCell>
                <TableCell>{component.status2}</TableCell>

                <TableCell>
                  {component.status2 === 'Accepted' ? (
                    <Button onClick={() => handleViewComponent(component._id)}>
                      View Component
                    </Button>
                  ) : component.status1 === 'Accepted' ? (
                    <Button onClick={() => handleUploadComponent(component._id)}>
                       Upload Component
                    </Button>
                  ) : (
                    <></>
                  )}
                </TableCell>


                <TableCell>{component.stars}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyComponents;
