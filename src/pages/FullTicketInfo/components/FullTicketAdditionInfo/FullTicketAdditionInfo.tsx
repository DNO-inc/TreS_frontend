import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import IPalette from 'theme/IPalette.interface'
import { formatDate } from 'functions/index'
import { endpoints } from 'constants'
import { ICreator } from 'components/Ticket/components/TicketBody/TicketBody'

interface FullTicketAdditionInfoProps {
  creator: ICreator | null
  faculty: {
    faculty_id: number
    name: string
  }
  date: string
}

const FullTicketAdditionInfo: FC<FullTicketAdditionInfoProps> = ({
  creator,
  faculty,
  date,
}) => {
  const { t } = useTranslation()
  const { palette }: IPalette = useTheme()

  const formattedData = formatDate(date)

  return (
    <Grid container>
      <Typography mb={2}>{t('fullTicket.additionalInfo')}</Typography>
      <Grid
        container
        sx={{
          gap: 1,
          '& > .MuiGrid-root': {
            flexBasis: { xs: '100%', sm: 'calc((100% - 16px) / 3)' },
            p: 2,
            gap: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'center', lg: '' },
            flexDirection: { xs: 'row', sm: 'column', lg: 'row' },
            bgcolor: palette.grey.card,
            borderRadius: 1,
            '& > *': {
              color: 'rgba(255, 255,255, 0.8)',
            },
          },
        }}
      >
        <Grid>
          <Typography>{t('fullTicket.author')}</Typography>
          <NavLink
            to={!creator ? '' : `${endpoints.PROFILE}/${creator.user_id}`}
            style={{ color: palette.semantic.info }}
          >
            @{!creator ? 'anonymous' : creator.login}
          </NavLink>
        </Grid>
        <Grid>
          <Typography>{t('fullTicket.faculty')}</Typography>
          <Box>{faculty.name}</Box>
        </Grid>
        <Grid>
          <Typography>{t('fullTicket.dateOfCreation')}</Typography>
          <Box>{formattedData}</Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { FullTicketAdditionInfo }
