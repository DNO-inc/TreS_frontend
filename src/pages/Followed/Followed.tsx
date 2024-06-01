import { FC } from 'react'

import { MyTicketsLayout } from 'layouts/MyTicketsLayout'

import { useGetSavedTicketsMutation } from 'api/tickets.api'
import { checkIsAdmin } from 'functions/checkIsAdmin'
import { useGetAdminFollowedTicketsMutation } from 'api/admin.api'

const Followed: FC = () => {
  const isAdmin = checkIsAdmin()
  const [getTickets, { isLoading, isSuccess }] = isAdmin
    ? useGetAdminFollowedTicketsMutation()
    : useGetSavedTicketsMutation()

  return (
    <MyTicketsLayout
      title={'followed'}
      useGetQuery={getTickets}
      isLoading={isLoading}
      isSuccess={isSuccess}
      option={'followed'}
    />
  )
}

export { Followed }
