import { ChangeEvent, FC } from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import { createFormKeys, general } from 'constants/index'
import IPalette from 'theme/IPalette.interface'

interface TicketBodyTextFieldProps {
  register: UseFormRegister<ICreateTicketRequestBody>
  errors: FieldErrors<ICreateTicketRequestBody>
  watch: UseFormWatch<ICreateTicketRequestBody>
}

const TicketBodyTextField: FC<TicketBodyTextFieldProps> = ({
  register,
  errors,
  watch,
}) => {
  const { t } = useTranslation()
  const { palette }: IPalette = useTheme()

  const placeholderText: string = t('createTicket.ticketBodyPlaceholder')

  const body = watch(createFormKeys.BODY, '')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    register(createFormKeys.BODY).onChange(event)
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Typography variant='h3'>{t('createTicket.ticketBody')}</Typography>
      <TextField
        id='ticket-body'
        placeholder={placeholderText}
        multiline
        rows={12}
        variant='outlined'
        fullWidth
        {...register(createFormKeys.BODY, {
          required: true,
          maxLength: general.MAX_BODY_LENGTH,
        })}
        value={body}
        onChange={handleChange}
        error={!!errors.body || body.length > general.MAX_BODY_LENGTH}
        sx={{
          overflow: 'hidden',
          bgcolor: palette.grey.card,
          '.MuiOutlinedInput-root': {
            p: '0 0 24px',
          },
          '& > .MuiOutlinedInput-root > textarea': {
            p: '12px 16px 0',
            '&::-webkit-scrollbar': {
              width: 4,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: palette.grey.border,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.36)',
              borderRadius: 4,
            },
          },
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 6,
          right: 8,
          fontSize: 12,
          color: palette.whiteAlpha.default,
        }}
      >
        {body.length} / {general.MAX_BODY_LENGTH}
      </span>
    </Box>
  )
}

export { TicketBodyTextField }
