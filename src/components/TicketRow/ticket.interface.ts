interface Creator {
  creator: {
    faculty: { faculty_id: number; name: string };
    firstname: string;
    group?: { group_id: number; name: string } | undefined;
    lastname: string;
    login: string;
    user_id: number | null;
  };
}

interface ITicket extends Creator {
  assignee: string | null;
  body: string;
  date: string;
  faculty: {
    faculty_id: number;
    name: string;
  };

  is_bookmarked: boolean;
  is_liked: boolean;
  queue: {
    faculty: number;
    name: string;
    queue_id: number;
    scope: string;
  };

  status: {
    name: string;
    status_id: number;
  };

  subject: string;
  ticket_id: number;
  upvotes: number;
}
