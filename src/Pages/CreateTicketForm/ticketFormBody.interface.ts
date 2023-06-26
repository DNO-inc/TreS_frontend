interface ICreateTicketRequestBody {
  subject: string;
  body: string;
  hidden: boolean;
  anonymous: boolean;
  queue: number | null;
  faculty: string;
}

interface IQueueData {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}
