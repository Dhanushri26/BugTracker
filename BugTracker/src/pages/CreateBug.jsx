import { Dialog, DialogTitle, FormControl, Typography,Box,TextField, Button } from "@mui/material";
import React from "react";
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CreateBug = ({ open, close }) => {
  const [data,setData] = React.useState({
    bugName: "",
    bugDescription: "",
    bugSeverity: "",
    bugStatus: "",
    bugDate: "",
  })
  const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    variants: [
      {
        props: { checked: true },
        style: {
          '.MuiFormControlLabel-label': {
            color: theme.palette.primary.main,
          },
        },
      },
    ],
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {

  value: PropTypes.any,
};
const onsubmit = () => {
  console.log("Form submitted");
  console.log(data);
}
  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>Create a Bug log !!</DialogTitle>
      <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100%",
        height: "100%",
      }}>
        <FormControl fullWidth sx={{ padding: "20px",width: "100%",margin:"auto",gap:"10px",pt:0 }}>
       <Typography>
        Bug Name : 
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter Bug Name"
          height="50px"
          size="small"
          onChange={(e) => setData({ ...data, bugName: e.target.value })}
          value={data.bugName}
        />
        <Typography >
          Bug Description:
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter Bug Description"
          multiline
          rows={3}
          onChange ={(e) => setData({...data,bugDescription:e.target.value})}
          value = {data.bugDescription}
        />
        <Typography>
          Bug Severity:
        </Typography>
            <RadioGroup name="use-radio-group" defaultValue="low" row onChange ={(e) => setData({...data,bugSeverity:e.target.value})}>
      <MyFormControlLabel value="low" label="Easy" control={<Radio />} />
      <MyFormControlLabel value="medium" label="Medium" control={<Radio />} />
      <MyFormControlLabel value="hard" label="Hard" control={<Radio />} />
    </RadioGroup>
    <Typography>
      Bug Date:
    </Typography>
    <LocalizationProvider dateAdapter={AdapterDayjs} onChange={(newValue) => setData({...data,bugDate:newValue})} value={data.bugDate}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>
    <Typography>
      Bug Status:
    </Typography>
    <RadioGroup name="use-radio-group" defaultValue="reported" row onAbort={(e) => setData({...data,bugStatus:e.target.value})} value={data.bugStatus}>
      <MyFormControlLabel value="reported" label="Reported" control={<Radio />} />
      <MyFormControlLabel value="resolved" label="Resolved" control={<Radio />} />
      <MyFormControlLabel value="progressing" label="Progressing" control={<Radio />} />
    </RadioGroup>
    <Button variant="contained" onClick={onsubmit}>Submit</Button>
         </FormControl>
      </Box>
     
    </Dialog>
  );
};

export default CreateBug;
