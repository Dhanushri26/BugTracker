import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import fileimage from "../images/folder.png";
import CreateBug from './CreateBug';
const classes = {
  root:{
    height: '100%',
    width:"100vw",
  },
  title:{
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: '1.2rem',
    color: '#000',
    textAlign: 'center',
  },
  img:{
    height:"50px",
    width:"50px",
    margin:"auto",
    paddingTop:"20px",
  }
}
const BugPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <Box sx={classes.root}>
     <Typography sx={classes.title}>
      Hello From BugTracker !!
     </Typography>
     <Typography sx={classes.title}>
      Let's Track and review your bugs here !!
     </Typography>
     <Box sx={classes.img} onClick={handleOpen}>
      <img src={fileimage} alt="bug" width="40px" height="40px"/>
     </Box>
     <CreateBug open = {open} close = {handleClose} />
     <Button variant="contained" onClick={handleOpen} sx={{marginTop: "20px"}}>
      Open Bug Tracker
     </Button>
     
    </Box>
  )
}

export default BugPage
