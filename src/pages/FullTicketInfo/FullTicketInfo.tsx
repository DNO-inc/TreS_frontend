import { useEffect, FC, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import useTheme from '@mui/material/styles/useTheme'

import { Loader } from '../../components/Loader'
import { ActionPanel } from './components/ActionPanel'
import { MarkdownWithStyles } from '../../utils/markdown'
import { FullTicketHeader } from './components/FullTicketHeader'
import { FullTicketComments } from './components/FullTicketComments'
import { FullTicketAdditionInfo } from './components/FullTicketAdditionInfo'
import { FullTicketFiles } from './components/FullTicketFiles'

import { useShowTicketMutation } from 'api/tickets.api'
import { checkIsAdmin } from 'functions/index'
import IPalette from 'theme/IPalette.interface'
import {
  useAdminShowTicketMutation,
  useAdminUpdateTicketMutation,
} from 'api/admin.api'
import { getUser } from 'functions/manipulateLocalStorage'
import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from 'api/tickets.api'
import { useCommentsConnection } from './hooks/useCommentsConnection'
import { useToggleAction } from 'hooks/index'
import { toggleOptions } from 'constants'

export interface IPerson {
  color: string
  nick: string
}

const FullTicketInfo: FC = () => {
  const { palette }: IPalette = useTheme()
  const { pathname } = useLocation()

  const ticketId = parseInt(pathname.split('/')[2])
  const commentsConnection = useCommentsConnection(ticketId)
  const isAdmin = checkIsAdmin()
  const { userId } = getUser()

  const [peopleSettings, setPeopleSettings] = useState(
    new Map<number, IPerson>()
  )
  const [upvotes, setUpvotes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  const [showTicket, { data: ticket, isSuccess, isLoading }] = isAdmin
    ? useAdminShowTicketMutation()
    : useShowTicketMutation()
  const [updateTicket, { isSuccess: isSuccessUpdate }] =
    useAdminUpdateTicketMutation()
  const [toggleLike] = useToggleLikeMutation()
  const [toggleFollowed] = useToggleBookmarkMutation()

  const isMyTicket = userId == ticket?.creator?.user_id
  const isCanManipulateFile = isMyTicket || isAdmin

  useEffect(() => {
    showTicket({ body: JSON.stringify({ ticket_id: ticketId }) })
  }, [ticketId, isSuccessUpdate])

  useEffect(() => {
    if (isSuccess) {
      setIsLiked(ticket?.is_liked)
      setUpvotes(ticket?.upvotes)
      setIsFollowed(ticket?.is_followed)
    }
  }, [isSuccess])

  const likeOption = !isLiked ? toggleOptions.LIKE : toggleOptions.UNLIKE

  const likeOptions = {
    toggleMutation: toggleLike,
    option: likeOption,
    setState: setIsLiked,
    ticketId: ticket?.ticket_id,
    dependencies: [isLiked],
    callback: () => {
      setUpvotes((prevUpvote: number) =>
        likeOption === 'like' ? prevUpvote + 1 : prevUpvote - 1
      )
    },
  }
  const handleToggleLike = useToggleAction(likeOptions)

  const followedOption = !isFollowed
    ? toggleOptions.BOOKMARK
    : toggleOptions.UNBOOKMARK

  const followedOptions = {
    toggleMutation: toggleFollowed,
    option: followedOption,
    setState: setIsFollowed,
    ticketId: ticket?.ticket_id,
    dependencies: [isFollowed],
  }
  const handleToggleFollowed = useToggleAction(followedOptions)

  return (
    <Grid container>
      {isLoading && <Loader />}
      {isSuccess && (
        <Grid
          container
          gap={3}
          sx={{
            pt: 6,
            pb: 10,
            '& > .MuiGrid-root > .MuiTypography-root:not(:first-of-type)': {
              fontSize: 20,
            },
          }}
        >
          <FullTicketHeader
            assigneeId={ticket?.assignee?.user_id}
            ticketFaculty={ticket.faculty.faculty_id}
            ticketStatus={ticket.status}
            ticketQueue={ticket.queue}
            ticketId={ticket.ticket_id}
            ticketAssignee={ticket.assignee}
            updateTicket={updateTicket}
            subject={ticket.subject}
            action={commentsConnection.action}
          />
          <Grid container>
            <Grid
              sx={{
                width: '100%',
                p: '16px 20px',
                bgcolor: palette.grey.card,
                borderRadius: 1,
                whiteSpace: 'pre-line',
              }}
            >
              <MarkdownWithStyles innerText={ticket.body} />
            </Grid>
          </Grid>
          <FullTicketFiles
            ticketId={ticket.ticket_id}
            isCanManipulateFile={isCanManipulateFile}
          />
          <FullTicketAdditionInfo
            creator={ticket?.creator}
            faculty={ticket.faculty}
            date={ticket.date}
          />
          <FullTicketComments
            peopleSettings={peopleSettings}
            setPeopleSettings={setPeopleSettings}
            ticketId={ticket.ticket_id}
            commentsConnection={commentsConnection}
          />
          <ActionPanel
            isLiked={isLiked}
            upvotes={upvotes}
            isFollowed={isFollowed}
            handleToggleLike={handleToggleLike}
            handleToggleFollowed={handleToggleFollowed}
            isMyTicket={userId === ticket?.creator?.user_id}
          />
        </Grid>
      )}
    </Grid>
  )
}

export { FullTicketInfo }
