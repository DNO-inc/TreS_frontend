import axios from 'axios'
import {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import useTheme from '@mui/material/styles/useTheme'

import { NotFound } from 'components/NotFound'
import { SimpleTicket } from 'components/SimpleTicket/SimpleTicket'

import { ITicket } from 'components/Ticket/ticket.interface'
import { endpoints, storage } from 'constants/index'
import IPalette from 'theme/IPalette.interface'

interface ScopeTicketListProps {
  scope: string
  queues: number[]
  facultyId: number
}

interface RequestQueuesParams {
  scope?: string
  queue?: number[]
  assignee?: number
  status?: number[]
  items_count?: number
  faculty?: number
  start_page?: number
}

const ScopeTicketList: FC<ScopeTicketListProps> = ({
  scope,
  queues,
  facultyId,
}) => {
  const { palette }: IPalette = useTheme()

  const [tickets, setTickets] = useState<ITicket[]>([])
  const [prevQueues, setPrevQueues] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const containerRef = useRef<HTMLInputElement | null>(null)
  const observer: MutableRefObject<undefined | IntersectionObserver> = useRef()

  const lastTicketElementRef: any = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prevPage => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    setIsLoading(true)

    const isQueuesChanged = prevQueues.toString() !== queues.toString()

    setPrevQueues(queues)

    const requestParams: RequestQueuesParams = {
      assignee: -1,
      scope: scope,
      queue: queues,
      faculty: facultyId,
      items_count: Math.floor(window.innerHeight / 140),
      start_page: isQueuesChanged ? 1 : currentPage,
    }

    if (isQueuesChanged && currentPage !== 1) {
      setCurrentPage(1)

      const container = containerRef.current

      if (isQueuesChanged && container) {
        container.scrollTop = 0
      }
    } else {
      axios({
        method: 'POST',
        url: `${endpoints.BASE_URL}/admin/tickets/ticket_list`,
        data: requestParams,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(storage.ACCESS_TOKEN)}`,
        },
      })
        .then(response => {
          setTickets(prevTickets =>
            currentPage === 1
              ? [...response.data.ticket_list]
              : [...prevTickets, ...response.data.ticket_list]
          )
          setHasMore(currentPage < response.data.total_pages)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [queues, currentPage])

  return (
    <Box sx={{ mt: 1 }}>
      {tickets.length ? (
        <>
          <Grid
            ref={containerRef}
            container
            gap={2}
            sx={{
              scrollBehavior: 'smooth',
              alignContent: 'start',
              height: 'calc(100vh - 380px)',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: palette.grey.border,
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: palette.grey.active,
              },
              '&': {
                scrollbarWidth: 'thin',
                scrollbarColor: '#555 #212125',
              },
              '&:hover': {
                scrollbarColor: '#555 #212125',
              },
            }}
          >
            {tickets.map((ticket, index) => {
              if (tickets.length === index + 1) {
                return (
                  <SimpleTicket
                    ref={lastTicketElementRef}
                    ticket={ticket}
                    key={ticket.ticket_id}
                  />
                )
              }

              return <SimpleTicket ticket={ticket} key={ticket.ticket_id} />
            })}
          </Grid>
        </>
      ) : (
        <Box>
          <NotFound size={250} />
        </Box>
      )}
    </Box>
  )
}

export { ScopeTicketList }
