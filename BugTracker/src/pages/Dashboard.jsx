import React from "react";
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  Box,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

const sampleBugs = [
  {
    title: "Login button not working",
    status: "open",
    description: "Clicking on the login button does nothing in the web app.",
    expected_output: "User should be redirected to the dashboard after login.",
    actual_output: "No action is triggered when the login button is clicked.",
    date: new Date(),
  },
  {
    title: "Profile picture not uploading",
    status: "open",
    description: "Users are unable to upload profile pictures larger than 1MB.",
    expected_output:
      "Image should be uploaded successfully regardless of size (up to 5MB).",
    actual_output:
      "System throws an error when uploading images larger than 1MB.",
    date: new Date(),
  },
  {
    title: "Search returning wrong results",
    status: "in-progress",
    description: "The search function is showing unrelated results.",
    expected_output:
      "Search should return only relevant results matching keywords.",
    actual_output: "Search results include unrelated items and duplicates.",
    date: new Date(),
  },
  {
    title: "Dark mode not applied on refresh",
    status: "open",
    description: "Dark mode is enabled but resets after refreshing the page.",
    expected_output: "Dark mode should persist after refreshing.",
    actual_output:
      "Page reloads with light mode regardless of saved preference.",
    date: new Date(),
  },
  {
    title: "Payment gateway timeout",
    status: "closed",
    description:
      "Checkout process fails due to timeout in payment gateway API.",
    expected_output:
      "Payment should complete and redirect to order confirmation.",
    actual_output: "Users are stuck on loading spinner until timeout occurs.",
    date: new Date(),
  },
];

const Dashboard = () => {
  return (
    <Grid>
      <Box sx={{ height: "2em", display: "block", margin: "2em" }}>Logo</Box>
      <Box
      // sx={{
      //   width: "100vw",
      //   justifyContent: "space-evenly",
      //   display: "flex",
      //   margin: "auto",
      // }}
      >
        <FormControl
          sx={{
            width: "90%",
            height: "3.5em",
            margin: "auto",
            marginBottom: "2em",
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
            flexDirection: "row",
          }}
        >
          <OutlinedInput
            sx={{ width: "100%" }}
            id="Search"
            startAdornment={
              <InputAdornment>
                {" "}
                <SearchIcon />
              </InputAdornment>
            }
          ></OutlinedInput>
          <Box
            sx={{
              alignItems: "center",
              border: "1px solid lightgray",
              height: "100%",
              display: "flex",
              width: "70px",
              borderRadius: "5px",
              justifyContent: "center",
            }}
          >
            <FilterAltIcon />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid lightgray",
              height: "100%",
              width: "70px",
              borderRadius: "5px",
              justifyContent: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </Box>
        </FormControl>
      </Box>
      <Grid
        container
        sx={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1em",
        }}
      >
        {sampleBugs.map((bug) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "88%",
                border: "1px solid lightgray",
                borderRadius: "5px",
                height: "5em",
                justifyContent: "space-between",
                alignItems: "center",
                paddingInline: "1em",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  justifyContent: "space-evenly",
                  overflow: "ellipsis",
                }}
              >
                <Typography sx={{ fontFamily: "Comic Relief" }}>
                  Title : {bug.title}
                </Typography>
                <Typography sx={{ fontFamily: "Comic Relief" }}>
                  Description : {bug.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", gap: "1em" }}>
                <EditIcon />
                <FavoriteBorderIcon />
                <InfoOutlineIcon />
              </Box>
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
