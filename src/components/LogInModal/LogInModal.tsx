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

/**
 * Props for the {@link LogInModal} component.
 */
export interface LogInModalProps {
  /**
   * Whether the modal is open.
   */
  open: boolean

  /**
   * Function to update the modal open state.
   */
  setOpen: Dispatch<SetStateAction<boolean>>

  /**
   * Function to call when the user wants to sign up instead.
   */
  handleSignUn: () => void
}

/**
 * `LogInModal` is a multi-step modal component used for user authentication.
 *
 * It contains 3 steps:
 * 1. Login form (`LoginStep`)
 * 2. Email confirmation form (`SendEmailStep`)
 * 3. Final confirmation (`ConfirmStep`)
 *
 * The component is responsive and adjusts layout based on screen width.
 *
 * @param open - Boolean indicating if the modal is visible
 * @param setOpen - Function to control visibility of the modal
 * @param handleSignUn - Callback triggered when the user chooses to sign up instead
 * @returns A login modal component
 *
 * @category Components
 */
const LogInModal: FC<LogInModalProps> = ({ open, setOpen, handleSignUn }) => {
  const { palette }: IPalette = useTheme()

  /**
   * True if screen width is less than login modal breakpoint.
   */
  const matches = useMediaQuery(
    `(max-width: ${dimensions.BREAK_POINTS.LOGIN_MODAL}px)`
  )

  /**
   * Active step index in the login flow (0 - login, 1 - email, 2 - confirm).
   */
  const [activeStep, setActiveStep] = useState(0)

  /**
   * Handles closing the modal and resetting to the first step.
   */
  const handleClose = (): void => {
    setOpen(false)
    setActiveStep(0)
  }

  /**
   * Common style object for step wrapper layout.
   */
  const wrapperStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute' as const,
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
  )
}

/**
 * A modal used for user login with step-based navigation (login, email confirmation, final confirmation).
 */
export { LogInModal }
