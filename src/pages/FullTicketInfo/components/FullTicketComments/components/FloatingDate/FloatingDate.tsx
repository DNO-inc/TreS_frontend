import { Box, useTheme } from '@mui/material'
import { FC } from 'react'
import IPalette from 'theme/IPalette.interface'

interface FloatingDateProps {
  date: string
}

const FloatingDate: FC<FloatingDateProps> = ({ date }) => {
  const { palette }: IPalette = useTheme()
  return (
    <Box
      sx={{
        margin: '0 auto',
        bgcolor: palette.grey.border,
        p: '4px 24px',
        borderRadius: '24px',
        opacity: 0.4,
      }}
    >
      {date}
    </Box>
  )
}

export { FloatingDate }
