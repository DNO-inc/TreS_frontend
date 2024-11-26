import useTheme from '@mui/material/styles/useTheme'

import { statuses } from 'constants/statuses'
import IPalette from 'theme/IPalette.interface'

const useCheckStatus = (status: string): string => {
  const { palette }: IPalette = useTheme()

  const colorsMap = {
    [statuses.NEW]: palette.common.white,
    [statuses.ACCEPTED]: palette.semantic.warning,
    [statuses.OPEN]: palette.semantic.info,
    [statuses.WAITING]: palette.semantic.waiting,
    [statuses.CLOSED]: palette.semantic.success,
    [statuses.REJECTED]: palette.semantic.error,
  }

  const color = colorsMap[status.toLowerCase()]

  return color
}

export { useCheckStatus }
