import { useState, FC, Dispatch, SetStateAction } from "react";

import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

import { SendEmailStep } from "./components/SendEmailStep";
import { LoginStep } from "./components/LoginStep/LoginStep";
import { ConfirmStep } from "./components/ConfirmStep";

interface LogInModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSignUn: () => void;
}

const LogInModal: FC<LogInModalProps> = ({ open, setOpen, handleSignUn }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleClose = (): void => {
    setOpen(false);
    setActiveStep(0);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 4 }}>
          {activeStep === 0 && (
            <LoginStep
              handleSignUn={handleSignUn}
              setActiveStep={setActiveStep}
              setOpen={setOpen}
            />
          )}
          {activeStep === 1 && <SendEmailStep setActiveStep={setActiveStep} />}
          {activeStep === 2 && <ConfirmStep setOpen={setOpen} />}
        </Box>
      </Modal>
    </>
  );
};

export { LogInModal };
