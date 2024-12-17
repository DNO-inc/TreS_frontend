import { useTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const ComingSoon = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      sx={{ height: '70vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography
        sx={{
          textTransform: 'capitalize',
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        {t('common.comingSoon')}
      </Typography>
    </Grid>
  )
}

export { ComingSoon }
