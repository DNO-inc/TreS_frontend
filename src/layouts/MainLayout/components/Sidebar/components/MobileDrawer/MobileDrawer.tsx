import { FC } from 'react'

import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import { SidebarActions } from '../SidebarActions'

import { dimensions } from 'constants/index'
import IPalette from 'theme/IPalette.interface'
import Logo from '../../../../../../assets/logo.svg'

interface MobileDrawerProps {
  container: (() => HTMLElement) | undefined
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

const MobileDrawer: FC<MobileDrawerProps> = ({
  container,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const { palette }: IPalette = useTheme()
  const drawerWidth = dimensions.DRAWER_WIDTH

  return (
    <Drawer
      container={container}
      variant='temporary'
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
        '& > div': {
          '&::-webkit-scrollbar': {
            width: 3,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'inherit',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: palette.whiteAlpha.default,
            borderRadius: 2,
          },
        },
      }}
    >
      <Toolbar
        sx={{
          minHeight: '64px',
          borderBottom: `2px solid ${palette.grey.checkbox}`,
          mb: 2,
        }}
      >
        <Grid container justifyContent={'space-between'}>
          <Grid display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Avatar alt='Logo' src={Logo} sx={{ width: 36, height: 36 }} />
            <Typography
              sx={{
                ml: 1,
                textTransform: 'uppercase',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              TreS
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <SidebarActions />
    </Drawer>
  )
}

export { MobileDrawer }
