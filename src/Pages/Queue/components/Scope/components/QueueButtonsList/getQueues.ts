import { ChangeEvent } from "react";

interface IQueue {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
}
interface StatusFullObject {
  queue_id: number;
  faculty: number;
  name: string;
  scope: string;
  checked: boolean;
  onChange:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

export const useGetQueuesFullObject = (
  queues: IQueue[],
  checked: boolean[],
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>) => void
): StatusFullObject[] => {
  return [...queues].map((queue, index) => ({
    ...queue,
    checked: !!checked[index],
    onChange: handleChange(index),
  }));
};

export const useGetQueuesName = (queues: IQueue[]): string[] => {
  const queuesName = queues.map((queue: IQueue) => queue.name);

  return queuesName;
};
