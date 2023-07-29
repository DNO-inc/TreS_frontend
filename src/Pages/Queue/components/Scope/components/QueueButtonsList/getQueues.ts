import { ChangeEvent } from "react";

interface StatusFullObject {
  id: number;
  query: string;
  label: string;
  checked: boolean;
  onChange:
    | ((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)
    | undefined;
}

export const useGetQueuesFullObject = (
  checked: boolean[],
  handleChange: (id: number) => (event: ChangeEvent<HTMLInputElement>) => void
): StatusFullObject[] => {
  return [
    {
      id: 0,
      query: "accepted",
      label: "Queue 1",
    },
    {
      id: 1,
      query: "open",
      label: "Queue 2",
    },
    {
      id: 2,
      query: "waiting",
      label: "Queue 3",
    },
    {
      id: 3,
      query: "close",
      label: "Queue 4",
    },
    {
      id: 4,
      query: "new",
      label: "Queue 5",
    },
  ].map(status => ({
    ...status,
    checked: !!checked[status.id],
    onChange: handleChange(status.id),
  }));
};

export const useGetQueuesName = (): string[] => {
  return ["Queue1", "Queue2", "Queue3", "Queue4", "Queue5"];
};
