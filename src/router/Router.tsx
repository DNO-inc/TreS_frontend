import { FC, lazy, Suspense, useEffect } from 'react'
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import { Loader } from 'components/Loader'
import PrivacyPolicy from 'pages/PrivacyPolicy'

import { useAccessRenewMutation } from 'api/profile.api'
import { endpoints, permissions } from 'constants/index'
import { useAuth } from 'context/AuthContext/AuthContext'

const Layout = lazy(() => import('layouts/MainLayout'))
const GeneralTickets = lazy(() => import('pages/GeneralTickets'))
const Received = lazy(() => import('pages/Received'))
const Sent = lazy(() => import('pages/Sent'))
const Followed = lazy(() => import('pages/Followed'))
const Bookmarks = lazy(() => import('pages/Bookmarks'))
const Deleted = lazy(() => import('pages/Deleted'))
const Profile = lazy(() => import('pages/Profile'))
const Queue = lazy(() => import('pages/Queue'))
const Notifications = lazy(() => import('pages/Notifications'))
const ErrorPage = lazy(() => import('pages/ErrorPage'))
const FullTicketInfo = lazy(() => import('pages/FullTicketInfo'))
const Statistic = lazy(() => import('pages/Statistic'))
const CreateTicketForm = lazy(() => import('pages/CreateTicketForm'))
const PermissionDenied = lazy(() => import('pages/PermissionDenied'))

const PrivateRoute = lazy(() => import('./PrivateRoute'))
const PermissionRote = lazy(() => import('./PermissionRote'))
const AdminRoute = lazy(() => import('./AdminRoute'))

type ApiResponse = {
  data?: { access_token: string }
  error?: any
}

const Router: FC = () => {
  const { isAuth, registerUser } = useAuth()

  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  const [searchParams] = useSearchParams()

  const [resetPassword] = useAccessRenewMutation({})

  useEffect(() => {
    if (pathname === '/') {
      navigate(endpoints.GENERAL_TICKETS)
    } else if (searchParams.has('reset_token')) {
      const resetToken = searchParams.get('reset_token')

      resetPassword(resetToken).then((res: ApiResponse) => {
        const accessToken = res?.data && res?.data?.access_token

        registerUser(accessToken)
      })

      navigate(endpoints.GENERAL_TICKETS)
    }
  }, [pathname, search, isAuth])

  return (
    <Routes>
      <Route
        path={endpoints.BASE}
        element={
          <Suspense fallback={<Loader />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={endpoints.GENERAL_TICKETS} element={<GeneralTickets />} />
        <Route element={<PrivateRoute />}>
          <Route
            element={<PermissionRote permission={permissions.CREATE_TICKET} />}
          >
            <Route
              path={endpoints.CREATE_TICKET}
              element={<CreateTicketForm />}
            />
          </Route>
          <Route
            path={`${endpoints.FULL_TICKET}/:ticketId`}
            element={<FullTicketInfo />}
          />
          <Route path={endpoints.SENT} element={<Sent />} />
          <Route path={endpoints.FOLLOWED} element={<Followed />} />
          <Route path={endpoints.BOOKMARKS} element={<Bookmarks />} />
          <Route path={endpoints.DELETED} element={<Deleted />} />
          <Route path={endpoints.NOTIFICATIONS} element={<Notifications />} />
          <Route path={`${endpoints.PROFILE}/:userId`} element={<Profile />} />
          <Route element={<AdminRoute />}>
            <Route path={endpoints.QUEUE} element={<Queue />} />
            <Route path={endpoints.RECEIVED} element={<Received />} />
            <Route path={endpoints.STATISTIC} element={<Statistic />} />
          </Route>
        </Route>
        <Route
          path={endpoints.PERMISSION_DENIED}
          element={<PermissionDenied />}
        />
        <Route path={'*'} element={<ErrorPage />} />
      </Route>
      <Route path={endpoints.PRIVACY_POLICY} element={<PrivacyPolicy />} />
      <Route path={'*' || '/error'} element={<ErrorPage />} />
    </Routes>
  )
}

export { Router }
