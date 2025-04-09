import { Dispatch, FC, SetStateAction, lazy, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import ArticleIcon from '@mui/icons-material/Article'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import GridViewIcon from '@mui/icons-material/GridView'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined'
import SourceRoundedIcon from '@mui/icons-material/SourceRounded'

import { NavbarListItem } from './components/NavbarListItem'

import { endpoints } from 'constants/index'
import { useAuth } from 'context/AuthContext/AuthContext'
import { useNotification } from 'context/NotificationContext/NotificationContext'
import { checkIsAdmin } from 'functions/index'

const NestedList = lazy(() => import('./components/NestedList'))

interface GeneralActionsProps {
  selectedKey: string
  setSelectedKey: Dispatch<SetStateAction<string>>
}

const GeneralActions: FC<GeneralActionsProps> = ({
  selectedKey,
  setSelectedKey,
}) => {
  const { t } = useTranslation()

  const { isAuth } = useAuth()
  const { countOfNotification } = useNotification()

  const isAdmin = checkIsAdmin()

  const [open, setOpen] = useState<boolean>(false)

  const handleClick = (): void => {
    setOpen(!open)
  }

  const handleListItemClick = (key: string): void => {
    setSelectedKey(key)
  }

  function notificationsLabel(count: number): string {
    if (count === 0) {
      return 'no notifications'
    }
    if (count > 99) {
      return 'more than 99 notifications'
    }

    return `${count} notifications`
  }

  useEffect(() => {
    setOpen(false)
  }, [isAuth])

  return (
    <>
      <List
        sx={{
          '& > li > a': {
            width: '100%',
          },
        }}
      >
        <NavbarListItem
          title={'generalTickets'}
          endpoint={endpoints.GENERAL_TICKETS}
          disabled={false}
          selectedKey={selectedKey}
          handleListItemClick={handleListItemClick}
          activeIcon={<ArticleIcon />}
          disableIcon={<ArticleOutlinedIcon />}
        />
        <ListItem key={'My Tickets'} disablePadding>
          <ListItemButton disabled={!isAuth} onClick={handleClick}>
            <ListItemIcon>
              {open ? <SourceRoundedIcon /> : <SourceOutlinedIcon />}
            </ListItemIcon>
            <ListItemText primary={t('sidebar.myTickets.title')} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <NestedList
          open={open}
          selectedKey={selectedKey}
          handleListItemClick={handleListItemClick}
        />
        {isAdmin && (
          <>
            <NavbarListItem
              title={'queue'}
              endpoint={endpoints.QUEUE}
              disabled={!isAuth}
              selectedKey={selectedKey}
              handleListItemClick={handleListItemClick}
              activeIcon={<GridViewSharpIcon />}
              disableIcon={<GridViewIcon />}
            />
            <NavbarListItem
              title={'statistic'}
              endpoint={endpoints.STATISTIC}
              disabled={!isAuth}
              selectedKey={selectedKey}
              handleListItemClick={handleListItemClick}
              activeIcon={<InsertChartIcon />}
              disableIcon={<InsertChartOutlinedIcon />}
            />
          </>
        )}
        <NavbarListItem
          title={'notifications'}
          endpoint={endpoints.NOTIFICATIONS}
          disabled={!isAuth}
          selectedKey={selectedKey}
          handleListItemClick={handleListItemClick}
          activeIcon={<NotificationsIcon />}
          disableIcon={<NotificationsOutlinedIcon />}
        >
          {isAuth && (
            <IconButton aria-label={notificationsLabel(countOfNotification)}>
              <Badge
                badgeContent={countOfNotification}
                color='primary'
                sx={{ '& > span': { color: 'white' } }}
              ></Badge>
            </IconButton>
          )}
        </NavbarListItem>
      </List>
    </>
  )
}

export { GeneralActions }
