import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useGetFacultiesQuery } from "../../../../../store/api/api";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { useCreateTicketMutation } from "../../../../../store/api/tickets/tickets.api";

const CreateTicketForm = () => {
  const { palette } = useTheme();

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [hidden, setHidden] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [faculty, setFaculty] = useState("");

  const { data, isSuccess } = useGetFacultiesQuery();
  const [createTicket, result] = useCreateTicketMutation();

  let requestBody = {
    subject,
    body,
    hidden,
    anonymous,
    faculty,
  };

  const handleChange = (e, setFunction) => {
    setFunction(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createTicket({ body: JSON.stringify(requestBody) });
    setSubject("");
    setBody("");
    setHidden(false);
    setAnonymous(false);
    setFaculty("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            borderRadius: 4,
            gap: 3,
            bgcolor: palette.grey.border,
            p: 3,
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Create Ticket
            </Typography>
            <Box
              sx={{
                "&:firstOfType": {
                  mr: 4,
                },
              }}
            >
              <IconButton
                onClick={() => setHidden(prevHiddenStatus => !prevHiddenStatus)}
                size="large"
              >
                {hidden ? (
                  <VisibilityOffIcon fontSize="30" />
                ) : (
                  <VisibilityIcon fontSize="30" />
                )}
              </IconButton>
              <IconButton
                onClick={() =>
                  setAnonymous(prevAnonymousStatus => !prevAnonymousStatus)
                }
                size="large"
              >
                {anonymous ? (
                  <GppGoodIcon fontSize="30" />
                ) : (
                  <GppBadIcon fontSize="30" />
                )}
              </IconButton>
            </Box>
          </Grid>
          <TextField
            required
            label="Title"
            value={subject}
            onChange={e => handleChange(e, setSubject)}
            sx={{ width: "50%" }}
          />
          <TextField
            required
            label="Description"
            value={body}
            multiline
            rows={10}
            onChange={e => handleChange(e, setBody)}
            fullWidth
          />
          <Grid container sx={{ justifyContent: "space-between" }}>
            <FormControl required sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={faculty}
                label="Faculty"
                onChange={e => handleChange(e, setFaculty)}
              >
                {isSuccess &&
                  data.faculties_list.map(faculty => {
                    return (
                      <MenuItem value={faculty} key={faculty}>
                        {faculty}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: 200 }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

CreateTicketForm.propTypes = {};

export { CreateTicketForm };
