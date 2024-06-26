import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import CheckboxesTags from '../Layout/CheckboxesTags';
import "../../styles/BasicModal.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function BasicModal({setResults,setDept,hanleApplyClick,tags,dept}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleModalClose = () =>{
    handleClose();
    hanleApplyClick();
  }
  return (
    <>
      <Button variant='contained' className='filter-btn' onClick={handleOpen} sx={{
                position: "sticky", '@media (min-width:900px)': {
                    display: 'none',
                },
            }}>Filters</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <CheckboxesTags  tags={tags} setResults={setResults} placeholder={"Tags"}/>
          <CheckboxesTags tags={dept} setResults={setDept} placeholder={"Department"}/>
          <Button variant='contained' onClick={handleModalClose}>Apply</Button>
        </Box>
      </Modal>
    </>
  );
}
