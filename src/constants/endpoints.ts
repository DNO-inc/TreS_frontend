const endpoints = {
  baseUrl: import.meta.env.VITE_API_URL,
  base: "/",
  fullTicket: "/tickets",
  dashboard: "/dashboard",
  sent: "/sent",
  received: "/received",
  followed: "/followed",
  bookmarks: "/bookmarks",
  deleted: "/deleted",
  notifications: "/notifications",
  generalTickets: "/general_tickets",
  settings: "/settings",
  profile: "/profile",
  createTicket: "/tickets/create",
};

export { endpoints };