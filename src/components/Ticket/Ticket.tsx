/**

Ticket component is responsible for rendering a single ticket card.

It shows ticket metadata, actions (like/bookmark), and supports interaction.
*/

import { ComponentType, FC, memo, MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import { SlideProps } from '@mui/material/Slide'
import useTheme from '@mui/material/styles/useTheme'

import { SlideNotification } from 'components/SlideNotification'
import { SnackbarNotification } from 'components/SnackbarNotification'
import { TicketActions } from './components/TicketActions'
import { TicketBody } from './components/TicketBody'
import { TicketHeader } from './components/TicketHeader'

import {
  useToggleBookmarkMutation,
  useToggleLikeMutation,
} from 'api/tickets.api'
import { endpoints, toggleOptions } from 'constants/index'
import { useAuth } from 'context/AuthContext/AuthContext'
import { getUser } from 'functions/manipulateLocalStorage'
import { useCheckStatus, useFormatDate } from 'hooks/index'
import { useToggleAction } from 'hooks/useToggleAction'
import IPalette from 'theme/IPalette.interface'
import { ITicket } from './ticket.interface'

/**
 * TicketProps defines the props accepted by the Ticket component.
 *
 * @interface TicketProps
 * @property {ITicket} ticket - Ticket data object containing full information about the ticket.
 * @property {number} ticketsPerRow - The number of tickets displayed in a single row, used to calculate width.
 */
interface TicketProps {
  ticket: ITicket
  ticketsPerRow: number
}

/**
 * Ticket component renders an interactive ticket card with actions like like, bookmark, and detailed view.
 * The card adjusts styling depending on ticket ownership, hidden status, and ticket status.
 *
 * @component
 * @param {TicketProps} props - Component props.
 * @returns {JSX.Element} A stylized ticket card.
 */
const Ticket: FC<TicketProps> = memo(({ ticket, ticketsPerRow }) => {
  const { palette }: IPalette = useTheme()
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  const { userId } = getUser()
  const creatorId = ticket?.creator?.user_id
  const isMyTicket = userId === creatorId
  const isHiddenTicket = isMyTicket && ticket.hidden

  /** Controls visibility of the snackbar. */
  const [open, setOpen] = useState(false)

  /** Snackbar transition animation component. */
  const [transition, setTransition] = useState<
    ComponentType<SlideProps> | undefined
  >(undefined)

  /** Total number of likes (upvotes) for the ticket. */
  const [upvotes, setUpvotes] = useState<number>(ticket.upvotes)

  /** Whether the current user has liked the ticket. */
  const [isLiked, setIsLiked] = useState<boolean>(false)

  /** Whether the current user has bookmarked the ticket. */
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  /** Color based on ticket status. */
  const color: string = useCheckStatus(ticket.status.name)

  /** Formatted ticket creation date. */
  const formattedDate: string = ticket?.date && useFormatDate(ticket.date)

  useEffect(() => {
    ticket.is_liked && setIsLiked(true)
    ticket.is_followed && setIsFollowed(true)
  }, [ticket.is_liked, ticket.is_followed])

  /**
   * Creates a transition component for snackbar notifications.
   *
   * @param {Omit<SlideProps, 'direction'>} props - Transition props.
   * @param {string} variant - Variant for the notification.
   * @returns {JSX.Element} A slide notification component.
   */
  function TransitionRight(
    props: Omit<SlideProps, 'direction'>,
    variant: string
  ) {
    return <SlideNotification props={props} variant={variant} />
  }

  /**
   * Opens the snackbar with a transition.
   *
   * @param {ComponentType<TransitionProps>} Transition - Transition component to apply.
   */
  const handleSnackbarClick = (
    Transition: ComponentType<Omit<SlideProps, 'direction'>>
  ) => {
    setTransition(() => Transition)
    setOpen(true)
  }

  /**
   * Handles closing the snackbar.
   *
   * @param {SyntheticEvent | Event} _ - Synthetic or native event.
   * @param {string} reason - Reason for closing.
   */
  const handleClose = (_: React.SyntheticEvent | Event, reason: string) => {
    if (reason === 'timeout') setOpen(false)
  }

  const [toggleLike] = useToggleLikeMutation()
  const [toggleFollowed] = useToggleBookmarkMutation()

  const likeOption = !isLiked ? toggleOptions.LIKE : toggleOptions.UNLIKE

  const likeOptions = {
    toggleMutation: toggleLike,
    option: likeOption,
    setState: setIsLiked,
    ticketId: ticket.ticket_id,
    dependencies: [isLiked],
    callback: () => {
      setUpvotes((prevUpvote: number) =>
        likeOption === 'like' ? prevUpvote + 1 : prevUpvote - 1
      )
      handleSnackbarClick(props => TransitionRight(props, likeOption))
    },
  }

  /**
   * Handles like/unlike logic with mutation and snackbar feedback.
   */
  const handleToggleLike = useToggleAction(likeOptions)

  const followedOption = !isFollowed
    ? toggleOptions.BOOKMARK
    : toggleOptions.UNBOOKMARK

  const followedOptions = {
    toggleMutation: toggleFollowed,
    option: followedOption,
    setState: setIsFollowed,
    ticketId: ticket.ticket_id,
    dependencies: [isFollowed],
    callback: () => {
      handleSnackbarClick(props => TransitionRight(props, followedOption))
    },
  }

  /**
   * Handles follow/unfollow logic with mutation and snackbar feedback.
   */
  const handleToggleFollowed = useToggleAction(followedOptions)

  /**
   * Handles click event on the ticket card.
   * Navigates to ticket detail page unless the click is on an excluded element.
   *
   * @param {MouseEvent} event - Mouse click event.
   */
  const handleClick = (event: MouseEvent): void => {
    const { target } = event

    if (
      target instanceof HTMLElement &&
      target.tagName !== 'path' &&
      !target.closest('.evadeItem')
    ) {
      isAuth && navigate(`${endpoints.FULL_TICKET}/${ticket.ticket_id}`)
    }
  }

  return (
    <Card
      onClick={handleClick}
      sx={{
        position: 'relative',
        flexBasis: `calc((100% - 16px * ${
          ticketsPerRow - 1
        }) / ${ticketsPerRow})`,
        height: 332,
        bgcolor: palette.grey.card,
        cursor: isAuth ? 'pointer' : 'default',
        backgroundImage: 'none',
        border: `2px solid ${palette.grey.border}`,
        '& > div > div': { p: 2 },
        '& > div > hr': {
          borderRadius: 2,
          border: `1px solid ${palette.grey.border}`,
          ml: 2,
          mr: 2,
        },
        '&::before': isHiddenTicket
          ? {
              content: "''",
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 2,
            }
          : {},
        '&::after': isHiddenTicket
          ? {
              content: "'🤫'",
              textAlign: 'center',
              fontSize: 170,
              position: 'absolute',
              top: '53%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'grayscale(80%)',
              opacity: 0.15,
              zIndex: 3,
            }
          : {},
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          borderLeft: `12px solid ${color}`,
        }}
      >
        <TicketHeader
          color={color}
          scope={ticket.queue?.scope}
          subject={ticket.subject}
          status={ticket.status.name}
          assignee={ticket.assignee}
        />
        <Divider />
        <TicketBody
          isHiddenTicket={isHiddenTicket}
          isMyTicket={isMyTicket}
          body={ticket.body}
          creator={ticket.creator}
          faculty={ticket.faculty.name}
        />
        <hr />
        <TicketActions
          isLiked={isLiked}
          upvotes={upvotes}
          isFollowed={isFollowed}
          handleToggleLike={handleToggleLike}
          handleToggleFollowed={handleToggleFollowed}
          formattedDate={formattedDate}
          isMyTicket={isMyTicket}
        />
        <SnackbarNotification
          open={open}
          handleClose={handleClose}
          transition={transition}
        />
      </Box>
    </Card>
  )
})

export { Ticket }
