const endpoints = {
  baseUrl: import.meta.env.VITE_API_URL,
  base: "/",
  fullTicket: "/tickets",
  queue: "/queue",
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
  error: "/error",
  privacyPolicy: "/privacy-policy",
  resetPassword: "/profile/access_renew/",
};

export { endpoints };
