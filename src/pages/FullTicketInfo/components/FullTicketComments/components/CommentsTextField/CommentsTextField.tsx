import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query'

import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useTheme from '@mui/material/styles/useTheme'
import TextField from '@mui/material/TextField'
import { useMediaQuery } from '@mui/material'

import SendIcon from '@mui/icons-material/Send'
import CheckIcon from '@mui/icons-material/Check'

import IPalette from '../../../../../../theme/IPalette.interface'
import { EditedComment, RepliedComment } from '../../FullTicketComments'
import { dimensions } from '../../../../../../constants'

interface CommentsTextFieldProps {
  ticketId: number
  editedComment: EditedComment | null
  setEditedComment: Dispatch<SetStateAction<EditedComment | null>>
  repliedComment: RepliedComment | null
  setRepliedComment: Dispatch<SetStateAction<RepliedComment | null>>
  createComment: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      'api'
    >
  >
  editComment: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      'api'
    >
  >
}

interface CreateCommentBody {
  ticket_id: number
  body: string
  reply_to?: string
}

interface EditCommentBody {
  comment_id: string
  body: string
}

const CommentsTextField: FC<CommentsTextFieldProps> = ({
  ticketId,
  createComment,
  editedComment,
  setEditedComment,
  editComment,
  repliedComment,
  setRepliedComment,
}) => {
  const { t } = useTranslation()
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.COMMENTS_TEXTFIELD}px)`
  )

  const { palette }: IPalette = useTheme()

  const [comment, setComment] = useState(editedComment?.body ?? '')

  const placeholder = t('fullTicket.comments.messagePlaceholder')

  const sendComment = () => {
    if (comment) {
      if (editedComment && editedComment?.id) {
        const body: EditCommentBody = {
          comment_id: editedComment.id,
          body: comment,
        }

        editComment({ body: JSON.stringify(body) })
        setEditedComment(null)
      } else {
        const body: CreateCommentBody = {
          ticket_id: ticketId,
          body: comment,
        }

        if (repliedComment?.id) {
          body['reply_to'] = repliedComment.id
        }

        createComment({ body: JSON.stringify(body) })
        setRepliedComment(null)
        setComment('')
      }
    }
  }

  useEffect(() => {
    if (!editedComment) {
      setComment('')
    }

    editedComment?.body && setComment(editedComment.body)
  }, [editedComment])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendComment()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        width: '100%',
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={3}
        value={comment}
        onChange={e => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        sx={{
          bgcolor: palette.grey.card,
          '& .MuiInputBase-root': {
            p: '12px',
          },
          '& .MuiInputBase-input': {
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: palette.grey.divider,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          },
        }}
      />
      <Button
        onClick={sendComment}
        variant='contained'
        color='inherit'
        startIcon={editedComment ? <CheckIcon /> : <SendIcon />}
        sx={{ pr: { xs: 2, sm: 4 }, pl: 4, height: 47 }}
      >
        {matches && t(`fullTicket.comments.${editedComment ? 'edit' : 'send'}`)}
      </Button>
    </Box>
  )
}

export { CommentsTextField }
