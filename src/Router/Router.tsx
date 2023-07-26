import { FC, useEffect, useState, lazy, Suspense } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Loader } from "../components/Loader";

import { endpoints } from "../constants";
import { useJwtDecode } from "../shared/hooks";

const Layout = lazy(() => import("../Pages/Layout"));
const GeneralTickets = lazy(() => import("../Pages/GeneralTickets"));
const Queue = lazy(() => import("../Pages/Queue"));
const Sent = lazy(() => import("../Pages/Sent"));
const Received = lazy(() => import("../Pages/Received"));
const Followed = lazy(() => import("../Pages/Followed"));
const Bookmarks = lazy(() => import("../Pages/Bookmarks"));
const Deleted = lazy(() => import("../Pages/Deleted"));
const Notifications = lazy(() => import("../Pages/Notifications"));
const Settings = lazy(() => import("../Pages/Settings"));
const Profile = lazy(() => import("../Pages/Profile"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));
const FullTicketInfo = lazy(() => import("../Pages/FullTicketInfo"));
const CreateTicketForm = lazy(() => import("../Pages/CreateTicketForm"));

const Router: FC = () => {
  const jwt = useJwtDecode();
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();

  const [isAuth, setIsAuth] = useState<boolean>(!!jwt);

  useEffect(() => {
    pathname === endpoints.base && navigate(endpoints.generalTickets);
  }, [pathname, navigate]);

  useEffect(() => {
    if (!isAuth && pathname !== endpoints.generalTickets) {
      navigate(endpoints.generalTickets);
    }
  }, [pathname, search, setSearchParams, isAuth, navigate]);

  return (
    <Routes>
      <Route
        path={endpoints.base}
        element={
          <Suspense fallback={<Loader />}>
            <Layout isAuth={isAuth} setIsAuth={setIsAuth} />
          </Suspense>
        }
      >
        <Route index element={<GeneralTickets />} />
        <Route
          path={`${endpoints.fullTicket}/:ticketId`}
          element={<FullTicketInfo />}
        />
        {localStorage.getItem("is-admin") && (
          <>
            <Route path={endpoints.queue} element={<Queue />} />
            <Route path={endpoints.received} element={<Received />} />
          </>
        )}
        <Route path={endpoints.generalTickets} element={<GeneralTickets />} />
        <Route path={endpoints.sent} element={<Sent />} />
        <Route path={endpoints.createTicket} element={<CreateTicketForm />} />
        <Route path={endpoints.followed} element={<Followed />} />
        <Route path={endpoints.bookmarks} element={<Bookmarks />} />
        <Route path={endpoints.deleted} element={<Deleted />} />
        <Route path={endpoints.notifications} element={<Notifications />} />
        <Route path={endpoints.settings} element={<Settings />} />
        <Route path={`${endpoints.profile}/:userId`} element={<Profile />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={"*" || "/error"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
