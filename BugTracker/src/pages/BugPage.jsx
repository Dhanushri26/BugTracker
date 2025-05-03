import React from 'react'
import { Box, Typography } from '@mui/material'
import fileimage from "../images/folder.png";
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
  return (
    <Box sx={classes.root}>
     <Typography sx={classes.title}>
      Hello From BugTracker !!
     </Typography>
     <Typography sx={classes.title}>
      Let's Track and review your bugs here !!
     </Typography>
     <Box sx={classes.img} onClick={()=>alert("Let's create a new msg")}>
      <img src={fileimage} alt="bug" width="40px" height="40px"/>
     </Box>
    </Box>
  )
}

export default BugPage
