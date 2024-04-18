import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import useTheme from '@mui/material/styles/useTheme'

import IPalette from 'theme/IPalette.interface'
import { statuses, urlKeys } from 'constants'
import { useChangeURL } from 'hooks/index'

export interface IStatus {
  id: number
  name: string
  color: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

export const useGetStatusesFullInfo = (
  isAllStatuses: boolean
): [IStatus[], boolean[]] => {
  const { palette }: IPalette = useTheme()

  const [searchParams] = useSearchParams()
  const putStatusesInURL = useChangeURL()

  const getStatusObject = (
    id: number,
    name: string,
    color: string,
    checked: boolean
  ): IStatus => ({
    id,
    name: name,
    color: palette.semantic[color],
    checked,
    onChange: handleChange(id),
  })

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const updatedChecked = [...checked]
      updatedChecked[index] = event.target.checked

      const selectedStatuses = statusesFullInfo
        .filter(status => updatedChecked[status.id])
        .map(status => status.name.toLowerCase())
        .join(',')

      putStatusesInURL(urlKeys.STATUSES, selectedStatuses, true)
    }

  const COMMON_STATUSES = [
    { id: 0, name: statuses.ACCEPTED, color: 'warning' },
    { id: 1, name: statuses.OPEN, color: 'info' },
    { id: 2, name: statuses.WAITING, color: 'waiting' },
    { id: 3, name: statuses.CLOSED, color: 'success' },
    { id: 4, name: statuses.REJECTED, color: 'error' },
  ]

  const ADDITIONAL_STATUSES = isAllStatuses
    ? [{ id: 5, name: statuses.NEW, color: 'new' }]
    : []

  const statusesList = [...COMMON_STATUSES, ...ADDITIONAL_STATUSES]

  const statusesName = statusesList.map(status => status.name)

  const statusesQueryParams: string[] | undefined =
    searchParams.get(urlKeys.STATUSES)?.split(',') ?? []

  const checked: boolean[] = statusesQueryParams
    ? statusesName.map(status => statusesQueryParams.includes(status))
    : statusesName.map(() => false)

  const statusesFullInfo = statusesList.map(status =>
    getStatusObject(status.id, status.name, status.color, !!checked[status.id])
  )

  return [statusesFullInfo, checked]
}
