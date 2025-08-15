import React from "react";
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  Box,
  InputAdornment,
} from "@mui/material";

const Dashboard = () => {
  return (
    <div>
      <Box sx={{}}>
        <OutlinedInput
          id="Search"
          startAdornment={<InputAdornment></InputAdornment>}
        ></OutlinedInput>
      </Box>
    </div>
  );
};

export default Dashboard;
