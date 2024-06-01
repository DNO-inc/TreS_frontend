import { Dispatch, FC, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import useTheme from '@mui/material/styles/useTheme'

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import IPalette from 'theme/IPalette.interface'
import { useToggleBookmarkMutation } from 'api/tickets.api'

interface TicketActionsProps {
  isCheckboxVisible: boolean
  isHaveBookmarks: boolean
  setDeletedList: Dispatch<SetStateAction<number[]>> | null
  ticketId: number
  isBookmarked: boolean
  setIsBookmarked: Dispatch<SetStateAction<boolean>>
}

const TicketActions: FC<TicketActionsProps> = ({
  isCheckboxVisible,
  isHaveBookmarks,
  setDeletedList,
  ticketId,
  isBookmarked,
  setIsBookmarked,
}) => {
  const { palette }: IPalette = useTheme()

  const [toggleBookmark] = useToggleBookmarkMutation()

  const handleToggleBookmark = (): void => {
    const option = !isBookmarked ? 'bookmark' : 'unbookmark'

    toggleBookmark({
      option: option,
      body: JSON.stringify({ ticket_id: ticketId }),
    })

    setIsBookmarked((prevIsBookmarked: boolean) => !prevIsBookmarked)
  }

  const handleSetDeleted = () => {
    if (setDeletedList) {
      setDeletedList(prevState => {
        let newDeletedList = [...prevState]

        if (newDeletedList.includes(ticketId)) {
          newDeletedList = newDeletedList.filter(id => id !== ticketId)
        } else {
          newDeletedList.push(ticketId)
        }

        return newDeletedList
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {isCheckboxVisible && (
        <Checkbox
          onClick={handleSetDeleted}
          color='default'
          className='evadeItem'
          sx={{
            width: 32,
            height: 32,
            m: '-6px',
            '& > .MuiSvgIcon-root': { fontSize: '20px' },
            p: 0,
            color: palette.common.white,
          }}
        />
      )}
      {isHaveBookmarks && (
        <IconButton
          onClick={handleToggleBookmark}
          className='evadeItem'
          sx={{
            width: 32,
            height: 32,
            m: '-6px',
            p: 0,
            border: 'none !important',
            '& > .MuiSvgIcon-root': { fontSize: '20px' },
          }}
        >
          {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />}
        </IconButton>
      )}
    </Box>
  )
}

export { TicketActions }
