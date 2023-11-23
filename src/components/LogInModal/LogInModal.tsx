import {
  FormEvent,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import { useTranslation } from "react-i18next";

import useTheme from "@mui/material/styles/useTheme";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import IPalette from "../../theme/IPalette.interface";
import { useAuth } from "../../context/AuthContext";

interface LogInModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSignUn: () => void;
}

const LogInModal: FC<LogInModalProps> = ({ open, setOpen, handleSignUn }) => {
  const { t } = useTranslation();
  const { palette }: IPalette = useTheme();
  const matches = useMediaQuery("(max-width: 500px)");

  const { loginUser } = useAuth();

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClose = (): void => setOpen(false);

  const handleOpenSignUpModal = (): void => {
    handleClose();
    handleSignUn();
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const isLogged = await loginUser({ login, password });

    if (isLogged) {
      setOpen(false);
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 4,
            gap: matches ? 3 : 4,
            width: matches ? "90vw" : 450,
            bgcolor: palette.grey.border,
            border: `2px solid ${palette.grey.active}`,
            p: matches ? "24px" : "32px 56px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("common.login")}
          </Typography>
          <TextField
            label={t("common.loginInput")}
            value={login}
            onChange={event => setLogin(event.target.value)}
            error={hasError}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("common.password")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={event => setPassword(event.target.value)}
              error={hasError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            {t("common.loginButton")}
          </Button>
          <Typography fontSize={14} sx={{ color: palette.whiteAlpha.default }}>
            {t("common.loginQuestion")}
            <span
              onClick={handleOpenSignUpModal}
              style={{
                marginLeft: 4,
                color: palette.semantic.info,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {t("common.loginRedirect")}
            </span>
          </Typography>
        </Grid>
      </form>
    </Modal>
  );
};

export { LogInModal };
