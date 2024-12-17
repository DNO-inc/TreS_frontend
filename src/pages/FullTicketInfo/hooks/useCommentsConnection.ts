import { useEffect, useState } from 'react'

import { endpoints } from 'constants'
import { useAuth } from 'context/AuthContext/AuthContext'
import { getAccessToken } from 'functions/manipulateLocalStorage'
import { IAction } from '../components/FullTicketComments/components/Action/Action'
import { IComment } from '../components/FullTicketComments/components/Comment/Comment'
import { useMessageHandler } from './useMessageHandler'

const useCommentsConnection = (ticketId: number) => {
  const { isAuth } = useAuth()

  const [createdComment, setCreatedComment] = useState<IComment | null>(null)
  const [changedComment, setChangedComment] = useState<IComment | null>(null)
  const [action, setAction] = useState<IAction | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const messageHandler = useMessageHandler({
    setAction,
    setCreatedComment,
    setChangedComment,
    setDeleteId,
  })

  const ping = () => {
    if (!ws) return
    if (ws.readyState !== 1) return
    ws.send('PING')
  }

  const openConnection = (webSocket: WebSocket) => {
    const accessToken = getAccessToken() || ''
    webSocket?.send(accessToken)
    webSocket?.send('CHAT')
    webSocket?.send(ticketId.toString())
  }

  useEffect(() => {
    if (isAuth && !ws) {
      const newWs = new WebSocket(endpoints.WS_URL)
      setWs(newWs)

      newWs.addEventListener('open', () => {
        openConnection(newWs)
        newWs.send('PING')
        setIsFirstLoad(false)
      })
      newWs.addEventListener('message', messageHandler)
    } else if (isAuth && ws) {
      setInterval(ping, isFirstLoad ? 25000 : 60000)
    } else if (!isAuth && ws) {
      ws.close()
      setWs(null)
    }

    return () => {
      if (ws) {
        ws.close()
      }
    }
  }, [isAuth, ws, ticketId])

  return {
    createdComment,
    changedComment,
    deleteId,
    action,
  }
}

export { useCommentsConnection }
