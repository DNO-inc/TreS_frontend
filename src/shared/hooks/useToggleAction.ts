import { Dispatch, SetStateAction, useCallback } from 'react'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
} from '@reduxjs/toolkit/query'

interface toggleActionProps {
  toggleMutation: MutationTrigger<
    MutationDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      any,
      'api'
    >
  >
  option: string
  setState: Dispatch<SetStateAction<boolean>>
  ticketId: number
  dependencies: any
  callback?: Function
}

const useToggleAction = ({
  toggleMutation,
  option,
  setState,
  ticketId,
  dependencies,
  callback = () => {},
}: toggleActionProps) => {
  const handleToggleAction = useCallback(() => {
    toggleMutation({
      option: option,
      body: JSON.stringify({ ticket_id: ticketId }),
    })

    setState((prevState: boolean) => !prevState)

    callback()
  }, [...dependencies, ticketId])

  return handleToggleAction
}

export { useToggleAction }
