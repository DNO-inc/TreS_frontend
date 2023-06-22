import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { endpoints } from "../constants";
import { useJwtDecode } from "../shared/hooks";
import { Layout } from "../Pages/Layout";
import { GeneralTickets } from "../Pages/GeneralTickets";
import { Dashboard } from "../Pages/Dashboard";
import { Sent } from "../Pages/Sent";
import { Received } from "../Pages/Received";
import { Followed } from "../Pages/Followed";
import { Bookmarks } from "../Pages/Bookmarks";
import { Deleted } from "../Pages/Deleted";
import { Notifications } from "../Pages/Notifications";
import { Settings } from "../Pages/Settings";
import { Profile } from "../Pages/Profile";
import { ErrorPage } from "../Pages/ErrorPage/ErrorPage";
import { FullTicketInfo } from "../Pages/FullTicketInfo";
import { CreateTicketForm } from "../Pages/CreateTicketForm";

const Router = () => {
  const jwt = useJwtDecode();
  const [isAuth, setIsAuth] = useState(!!jwt);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();

  useEffect(() => {
    !isAuth && navigate(endpoints.generalTickets);
  }, [isAuth, navigate]);

  useEffect(() => {
    pathname !== "/" && setSearchParams(new URLSearchParams(search));
  }, [pathname, search, setSearchParams]);

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
