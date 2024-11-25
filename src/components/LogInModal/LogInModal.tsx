import { Dispatch, FC, SetStateAction, useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

import { ConfirmStep } from './components/ConfirmStep'
import { LoginStep } from './components/LoginStep/LoginStep'
import { SendEmailStep } from './components/SendEmailStep'

import { dimensions } from 'constants/index'
import IPalette from 'theme/IPalette.interface'

interface LogInModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleSignUn: () => void
}

const LogInModal: FC<LogInModalProps> = ({ open, setOpen, handleSignUn }) => {
  const { palette }: IPalette = useTheme()
  const matches = useMediaQuery(
    `(max-width: ${dimensions.BREAK_POINTS.LOGIN_MODAL}px)`
  )

  const [activeStep, setActiveStep] = useState(0)

  const handleClose = (): void => {
    setOpen(false)
    setActiveStep(0)
  }

  const wrapperStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 4,
    gap: matches ? 3 : 4,
    width: matches ? '90vw' : 450,
    bgcolor: palette.grey.border,
    border: `2px solid ${palette.grey.active}`,
    p: matches ? '24px' : '32px 56px',
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-login'
        aria-describedby='modal-modal-authorization'
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
          {activeStep === 0 && (
            <LoginStep
              handleSignUn={handleSignUn}
              setActiveStep={setActiveStep}
              setOpen={setOpen}
              wrapperStyle={wrapperStyle}
            />
          )}
          {activeStep === 1 && (
            <SendEmailStep
              setActiveStep={setActiveStep}
              wrapperStyle={wrapperStyle}
            />
          )}
          {activeStep === 2 && (
            <ConfirmStep setOpen={setOpen} wrapperStyle={wrapperStyle} />
          )}
        </Box>
      </Modal>
    </>
  )
}

export { LogInModal }
