import { FC, useEffect, useState, lazy } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { Layout } from "../Pages/Layout";

import { endpoints } from "../constants";
import { useJwtDecode } from "../shared/hooks";

const GeneralTickets = lazy(() => import("../Pages/GeneralTickets"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
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
    } else {
      setSearchParams(new URLSearchParams(search));
    }
  }, [pathname, search, setSearchParams, isAuth, navigate]);

  return (
    <Routes>
      <Route
        path={endpoints.base}
        element={<Layout isAuth={isAuth} setIsAuth={setIsAuth} />}
      >
        <Route index element={<GeneralTickets />} />
        <Route
          path={`${endpoints.fullTicket}/:ticketId`}
          element={<FullTicketInfo />}
        />
        <Route path={endpoints.dashboard} element={<Dashboard />} />
        <Route path={endpoints.generalTickets} element={<GeneralTickets />} />
        <Route path={endpoints.sent} element={<Sent />} />
        <Route path={endpoints.createTicket} element={<CreateTicketForm />} />
        <Route path={endpoints.received} element={<Received />} />
        <Route path={endpoints.followed} element={<Followed />} />
        <Route path={endpoints.bookmarks} element={<Bookmarks />} />
        <Route path={endpoints.deleted} element={<Deleted />} />
        <Route path={endpoints.notifications} element={<Notifications />} />
        <Route path={endpoints.settings} element={<Settings />} />
        <Route path={`${endpoints.profile}/:userId`} element={<Profile />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
