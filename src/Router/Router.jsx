import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { endpoints } from "../constants";

const Router = ({ mode }) => {
  return (
    <Routes>
      <Route path={endpoints.base} element={<Layout mode={mode} />}>
        <Route index element={<h1>General Reports</h1>}></Route>
        <Route path={endpoints.dashboard} element={<h1>Dashboard</h1>} />
        <Route path={endpoints.myReports} element={<h1>My Reports</h1>} />
        <Route path={endpoints.sent} element={<h1>Sent</h1>} />
        <Route path={endpoints.received} element={<h1>Received</h1>} />
        <Route path={endpoints.followed} element={<h1>Followed</h1>} />
        <Route path={endpoints.saved} element={<h1>Saved</h1>} />
        <Route path={endpoints.deleted} element={<h1>Deleted</h1>} />
        <Route
          path={endpoints.notifications}
          element={<h1>Notifications</h1>}
        />
        <Route
          path={endpoints.generalReports}
          element={<h1>General Reports</h1>}
        />
        <Route path={endpoints.settings} element={<h1>Settings</h1>} />
        <Route path={endpoints.profile} element={<h1>Profile</h1>} />
      </Route>
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
};

export { Router };
