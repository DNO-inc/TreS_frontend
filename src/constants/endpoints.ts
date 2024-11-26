const endpoints = {
  BASE_URL: import.meta.env.VITE_API_URL,
  WS_URL: import.meta.env.VITE_WS_URL,
  BASE: '/',
  FULL_TICKET: '/tickets',
  QUEUE: '/queue',
  SENT: '/sent',
  RECEIVED: '/received',
  FOLLOWED: '/followed',
  BOOKMARKS: '/bookmarks',
  DELETED: '/deleted',
  NOTIFICATIONS: '/notifications',
  GENERAL_TICKETS: '/general_tickets',
  PROFILE: '/profile',
  CREATE_TICKET: '/tickets/create',
  ERROR: '/error',
  PRIVACY_POLICY: '/privacy-policy',
  ACCESS_RENEW: '/profile/access_renew/',
  PERMISSION_DENIED: '/permission_denied',
  STATISTIC: '/statistic',
}

export { endpoints }
