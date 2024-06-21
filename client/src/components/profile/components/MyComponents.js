// src/components/MyComponents.js
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import HtmlRenderer from '../../../utils/HtmlRenderer';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const MyComponents = ({ components }) => {
  console.log(components);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{<HtmlRenderer htmlString={component.description.short} />}</TableCell>
                <TableCell>{component.status1}</TableCell>
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
