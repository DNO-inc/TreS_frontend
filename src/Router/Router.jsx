import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { endpoints } from "../constants";
import { GeneralTickets } from "../components/Pages/GeneralTickets";
import { Dashboard } from "../components/Pages/Dashboard";
import { Sent } from "../components/Pages/Sent";
import { Received } from "../components/Pages/Received";
import { Followed } from "../components/Pages/Followed";
import { Bookmarks } from "../components/Pages/Bookmarks";
import { Deleted } from "../components/Pages/Deleted";
import { Notifications } from "../components/Pages/Notifications";
import { Settings } from "../components/Pages/Settings";
import { Profile } from "../components/Pages/Profile";
import { ErrorPage } from "../components/Pages/ErrorPage/ErrorPage";
import { useJwtDecode } from "../shared/hooks";
import { FullTicketInfo } from "../components/Pages/FullTicketInfo";
import { CreateTicketForm } from "../components/Pages/CreateTicketForm";

const Router = () => {
  const jwt = useJwtDecode();
  const [isAuth, setIsAuth] = useState(!!jwt);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate(endpoints.generalTickets);
  }, [isAuth]);

  return (
    <Routes>
      <Route
        path={endpoints.base}
        element={<Layout isAuth={isAuth} setIsAuth={setIsAuth} />}
      >
        <Route index element={<GeneralTickets />}></Route>
        <Route
          path={`${endpoints.fullTicket}/:ticketId`}
          element={<FullTicketInfo />}
        />
        <Route path={endpoints.dashboard} element={<Dashboard />} />
        <Route path={endpoints.sent} element={<Sent />} />
        <Route path={endpoints.createTicket} element={<CreateTicketForm />} />
        <Route path={endpoints.received} element={<Received />} />
        <Route path={endpoints.followed} element={<Followed />} />
        <Route path={endpoints.bookmarks} element={<Bookmarks />} />
        <Route path={endpoints.deleted} element={<Deleted />} />
        <Route path={endpoints.notifications} element={<Notifications />} />
        <Route path={endpoints.generalTickets} element={<GeneralTickets />} />
        <Route path={endpoints.settings} element={<Settings />} />
        <Route path={`${endpoints.profile}/:userId`} element={<Profile />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
};

export { Router };
