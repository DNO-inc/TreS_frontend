import { FC, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import useTheme from '@mui/material/styles/useTheme'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Theme, SxProps } from '@mui/material/styles'

import IPalette from 'theme/IPalette.interface'

interface ConfirmStepProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  wrapperStyle: SxProps<Theme>
}

const ConfirmStep: FC<ConfirmStepProps> = ({ setOpen, wrapperStyle }) => {
  const { t } = useTranslation()
  const { palette }: IPalette = useTheme()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container sx={wrapperStyle}>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        {t('login.confirm.header')}
      </Typography>
      <Typography
        id='modal-modal-title'
        sx={{
          fontSize: 16,
          color: palette.whiteAlpha.default,
          textAlign: 'center',
        }}
      >
        {t('login.confirm.description')}
      </Typography>
      <Button variant='contained' color='primary' onClick={handleClose}>
        {t('login.confirm.closed')}
      </Button>
    </Grid>
  )
}

export { ConfirmStep }
