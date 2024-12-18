import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import useTheme from '@mui/material/styles/useTheme'

import { VerticalDivider } from '../../../../../../components/VerticalDivider'
import { AdditionActions } from './components/AdditionActions'
import { GeneralActions } from './components/GeneralActions'

import { endpoints } from 'constants/index'
import { useAuth } from 'context/AuthContext/AuthContext'
import IPalette from 'theme/IPalette.interface'

const SidebarActions: FC = () => {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const { palette }: IPalette = useTheme()
  const { language } = useAuth()

  useEffect(() => {
    if (language === 'uk') {
      i18n.changeLanguage('ua')
    } else if (language === 'en') {
      i18n.changeLanguage('en')
    }
  }, [])

  const [selectedKey, setSelectedKey] = useState<string>(
    endpoints.GENERAL_TICKETS
  )

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)
  }

  const checkColor = (
    language: string,
    isStandard: boolean = false
  ): string => {
    return i18n.language === language || isStandard
      ? palette.primary.main
      : palette.common.white
  }

  useEffect(() => {
    setSelectedKey(pathname)
  }, [pathname])

  return (
    <Grid
      container
      flexDirection={'column'}
      height={'100vh'}
      flexWrap={'nowrap'}
      padding={' 0px 12px 16px'}
    >
      <Box flex={'1 0 auto'}>
        <GeneralActions
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
        <Divider sx={{ width: '100%' }} />
        <AdditionActions
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '& > button': { minWidth: 24 },
          }}
        >
          <Button
            onClick={() => {
              changeLanguage('en')
            }}
            sx={{
              color: checkColor('en', !i18n.language),
            }}
          >
            EN
          </Button>
          <VerticalDivider color={palette.grey.checkbox} />
          <Button
            onClick={() => {
              changeLanguage('ua')
            }}
            sx={{
              color: checkColor('ua'),
            }}
          >
            UA
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export { SidebarActions }
