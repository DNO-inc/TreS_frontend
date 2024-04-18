import { FC, Dispatch, SetStateAction } from 'react'
import { UseQueryHookResult } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  BaseQueryFn,
  FetchBaseQueryError,
  QueryDefinition,
} from '@reduxjs/toolkit/query'
import { FetchArgs } from '@reduxjs/toolkit/query'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useTheme from '@mui/material/styles/useTheme'

import { Loader } from 'components/Loader'

import IPalette from 'theme/IPalette.interface'

interface StatusSelectProps {
  status: IStatus
  setStatus: Dispatch<SetStateAction<IStatus>>
  statusesQuery: UseQueryHookResult<
    QueryDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      'api'
    >
  >
}

interface IStatus {
  status_id: number
  name: string
}

const StatusSelect: FC<StatusSelectProps> = ({
  status,
  setStatus,
  statusesQuery,
}) => {
  const { t } = useTranslation()
  const { palette }: IPalette = useTheme()

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedStatus: number = parseInt(event.target.value)

    setStatus(
      statusesQuery.data.statuses_list.filter(
        status => status.status_id === selectedStatus
      )[0]
    )
  }

  return (
    <Box>
      <FormControl
        size='small'
        fullWidth
        sx={{
          bgcolor: palette.grey.card,
          minWidth: '180px',
        }}
      >
        {statusesQuery.isLoading && <Loader size='small' />}
        {statusesQuery.isSuccess && (
          <Select
            id='status-select'
            value={status.status_id.toString()}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {statusesQuery.data.statuses_list.map(
              (status: IStatus, index: number) => {
                let isSelected = false

                if (status.status_id === index + 1) {
                  isSelected = true
                }

                return (
                  <MenuItem
                    value={status.status_id}
                    key={`menuItem-${status.status_id}`}
                    selected={isSelected}
                  >
                    <ListItemText
                      primary={t(`ticketStatus.${status.name.toLowerCase()}`)}
                    />
                  </MenuItem>
                )
              }
            )}
          </Select>
        )}
      </FormControl>
    </Box>
  )
}

export { StatusSelect }
