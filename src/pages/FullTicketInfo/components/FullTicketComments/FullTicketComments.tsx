import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

import { Action } from './components/Action'
import { ArrowDown } from './components/ArrowDown'
import { Comment } from './components/Comment'
import { CommentsTextField } from './components/CommentsTextField'
import { FloatingPanel } from './components/FloatingPanel'

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from 'api/comments.api'
import { useGetFullHistoryMutation } from 'api/tickets.api'
import { permissions } from 'constants/index'
import { getRandomNickColor } from 'functions/index'
import { getUser, getUserRole } from 'functions/manipulateLocalStorage'
import { useRandomNick } from 'hooks/index'
import IPalette from 'theme/IPalette.interface'
import { IPerson } from '../../FullTicketInfo'
import { IAction } from './components/Action/Action'
import { IComment } from './components/Comment/Comment'
import { FloatingDate } from './components/FloatingDate'

export type IHistoryItem = IAction | IComment

interface CreateCommentResponse {
  data?: {
    history: IHistoryItem[]
    page_count: number
  }
  error?: FetchBaseQueryError | SerializedError
}

interface FullTicketCommentsProps {
  ticketId: number
  commentsConnection: {
    createdComment: IComment | null
    changedComment: IComment | null
    action: IAction | null
    deleteId: string | null
  }
  peopleSettings: Map<number, IPerson>
  setPeopleSettings: Dispatch<SetStateAction<Map<number, IPerson>>>
}

export interface EditedComment {
  id: string
  body: string
}

export interface RepliedComment {
  id: string
  body: string
  fullName: string
}

const FullTicketComments: FC<FullTicketCommentsProps> = ({
  ticketId,
  commentsConnection,
  peopleSettings,
  setPeopleSettings,
}) => {
  const { t, i18n } = useTranslation()
  const { palette }: IPalette = useTheme()

  const { userId } = getUser()
  const { permissionList } = getUserRole()
  const isCanSendMessage = permissionList.includes(permissions.SEND_MESSAGE)

  const commentFieldRef: MutableRefObject<HTMLDivElement | null> = useRef(null)

  const [getComments] = useGetFullHistoryMutation()
  const [createComment] = useCreateCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()
  const [editComment] = useEditCommentMutation()

  const { createdComment, changedComment, deleteId, action } =
    commentsConnection

  // =========================================================
  const [comments, setComments] = useState<IHistoryItem[]>([])
  const [scrollHeight, setScrollHeight] = useState<number>(1221)
  const [isSmooth, setIsSmooth] = useState<boolean>(true)
  const [isVisibleArrow, setIsVisibleArrow] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isChangeComment, setIsChangeComment] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [repliedComment, setRepliedComment] = useState<RepliedComment | null>(
    null
  )
  const [editedComment, setEditedComment] = useState<EditedComment | null>(null)

  const observer: MutableRefObject<undefined | IntersectionObserver> = useRef()

  const lastCommentElementRef: any = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      setTimeout(() => {
        observer.current = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting && hasMore) {
              setCurrentPage(prevPage => prevPage + 1)
            }
          },
          { threshold: 1.0 }
        )

        if (node) observer.current.observe(node)
      }, 500)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    const scrollContainer = commentFieldRef.current

    if (scrollContainer) {
      if (isChangeComment) {
        setIsChangeComment(false)
        setScrollHeight(scrollContainer.scrollHeight)

        return
      }

      const commentAuthorId = createdComment?.author?.user_id
      const isMyChanges = commentAuthorId === userId
      const isDown =
        Math.abs(scrollContainer.scrollTop - scrollContainer.scrollHeight) <
        1000

      if (currentPage === 1 || isMyChanges || isDown) {
        setIsSmooth(true)
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight

          setScrollHeight(scrollContainer.scrollHeight)
        }, 0)
      } else if (currentPage !== 1 && isMyChanges) {
        setScrollHeight(0)
        setIsSmooth(true)
      }
    }
  }, [comments])

  useEffect(() => {
    const scrollContainer = commentFieldRef.current

    if (scrollContainer) {
      setIsSmooth(false)
      scrollContainer.scrollTop = scrollContainer.scrollHeight - scrollHeight

      setScrollHeight(scrollContainer.scrollHeight)
    }
  }, [currentPage])

  useEffect(() => {
    setIsLoading(true)

    hasMore &&
      getComments({
        body: JSON.stringify({
          start_page: currentPage,
          items_count: 15,
          ticket_id: ticketId,
        }),
      })
        .then((response: CreateCommentResponse) => {
          if (response && response?.data && response?.data?.history) {
            const newComments = [...response.data.history].reverse()

            setComments(prevComments => [...newComments, ...prevComments])

            setHasMore(response.data.page_count > currentPage)
            setIsLoading(false)
          }
        })
        .catch(error => {
          console.error(error)
        })
  }, [currentPage])

  useEffect(() => {
    if (createdComment) {
      setComments(prevComments => [...prevComments, createdComment])
    }
  }, [createdComment])

  useEffect(() => {
    if (action) {
      setComments(prevComments => {
        if (!prevComments.includes(action)) {
          return [...prevComments]
        }

        return [...prevComments, action]
      })
    }
  }, [action])

  useEffect(() => {
    if (deleteId) {
      setComments(prevComments =>
        prevComments.filter(comment => {
          const commentType = comment?.type_

          if (commentType === 'comment') {
            const commentId = comment?.comment_id

            return commentId !== deleteId
          }

          return true
        })
      )

      setIsChangeComment(true)
    }
  }, [deleteId])

  useEffect(() => {
    if (changedComment) {
      setComments(prevComments =>
        prevComments.map(comment => {
          const commentType = comment?.type_

          if (commentType === 'comment') {
            const commentId = comment?.comment_id
            const editedCommentId = changedComment?.comment_id

            if (commentId === editedCommentId) {
              return changedComment
            }
          }

          return comment
        })
      )

      setIsChangeComment(true)
    }
  }, [changedComment])

  // =========================================================

  useEffect(() => {
    const commentsField = commentFieldRef.current

    let intervalId = setInterval(() => {
      commentsField &&
        setIsVisibleArrow(
          Math.abs(commentsField?.scrollHeight - commentsField?.scrollTop) >
            1000
        )
    }, 2000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const getDatePart = (date: string) => {
    const d = new Date(date)
    const day = d.getDate()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    return `${day} ${t(`month.${month}`)} ${year}`
  }

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Typography mb={2}>{t('fullTicket.comments.heading')}</Typography>
      <Grid
        ref={commentFieldRef}
        container
        sx={{
          flexDirection: 'column',
          flexWrap: 'nowrap',
          overflowY: 'auto',
          width: '100%',
          height: 500,
          p: '16px 20px',
          bgcolor: palette.grey.card,
          borderRadius: 1,
          whiteSpace: 'pre-line',
          gap: 2,
          scrollBehavior: isSmooth ? 'smooth' : '',
          '&::-webkit-scrollbar': {
            width: 4,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'inherit',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: palette.whiteAlpha.default,
            borderRadius: 2,
          },
        }}
      >
        {comments.map((chatItem: IHistoryItem, index: number) => {
          const modifiedItem = { ...chatItem }

          const previousDate = getDatePart(comments[index - 1]?.creation_date)
          const currentDate = getDatePart(chatItem.creation_date)
          const isNeedDate = previousDate !== currentDate

          if (!peopleSettings.has(modifiedItem.author.user_id)) {
            const color = getRandomNickColor()
            const nick = useRandomNick(
              modifiedItem.author.firstname,
              modifiedItem.author.lastname
            )

            setPeopleSettings(prevState =>
              prevState.set(modifiedItem.author.user_id, {
                color,
                nick,
              })
            )

            modifiedItem.color = color
            modifiedItem.nick = nick
          } else {
            const person = peopleSettings.get(modifiedItem.author.user_id)

            if (person) {
              modifiedItem.color = person.color
              modifiedItem.nick = person.nick
            }
          }

          if (modifiedItem.type_ === 'comment') {
            if (index === 0) {
              return (
                <>
                  {isNeedDate && <FloatingDate date={currentDate} />}
                  <Comment
                    ref={lastCommentElementRef}
                    comment={modifiedItem}
                    key={`${modifiedItem.type_}-${modifiedItem.comment_id}`}
                    deleteComment={deleteComment}
                    setEditedComment={setEditedComment}
                    setRepliedComment={setRepliedComment}
                    isCanSendMessage={isCanSendMessage}
                  />
                </>
              )
            }

            return (
              <>
                {isNeedDate && <FloatingDate date={currentDate} />}
                <Comment
                  comment={modifiedItem}
                  key={`${modifiedItem.type_}-${modifiedItem.comment_id}`}
                  deleteComment={deleteComment}
                  setEditedComment={setEditedComment}
                  setRepliedComment={setRepliedComment}
                  isCanSendMessage={isCanSendMessage}
                />
              </>
            )
          } else if (modifiedItem.type_ === 'action') {
            if (index === 0) {
              return (
                <>
                  {isNeedDate && <FloatingDate date={currentDate} />}
                  <Action
                    ref={lastCommentElementRef}
                    action={modifiedItem}
                    translator={t}
                    lang={i18n.language}
                    key={`${modifiedItem.field_name}-${modifiedItem.ticket_id}-${index}`}
                  />
                </>
              )
            }

            return (
              <>
                {isNeedDate && <FloatingDate date={currentDate} />}
                <Action
                  action={modifiedItem}
                  translator={t}
                  lang={i18n.language}
                  key={`${modifiedItem.field_name}-${modifiedItem.ticket_id}-${index}`}
                />
              </>
            )
          }
        })}
      </Grid>
      {(editedComment || repliedComment) && (
        <FloatingPanel
          editedComment={editedComment}
          setEditedComment={setEditedComment}
          repliedComment={repliedComment}
          setRepliedComment={setRepliedComment}
        />
      )}
      {isVisibleArrow && (
        <ArrowDown
          isVisibleArrow={isVisibleArrow}
          commentFieldRef={commentFieldRef}
          setScrollHeight={setScrollHeight}
        />
      )}
      {isCanSendMessage && (
        <CommentsTextField
          ticketId={ticketId}
          createComment={createComment}
          editedComment={editedComment}
          editComment={editComment}
          setEditedComment={setEditedComment}
          repliedComment={repliedComment}
          setRepliedComment={setRepliedComment}
        />
      )}
    </Grid>
  )
}

export { FullTicketComments }
