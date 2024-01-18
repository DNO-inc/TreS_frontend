import { Dispatch, SetStateAction } from "react";

import FormGroup from "@mui/material/FormGroup";
import useMediaQuery from "@mui/material/useMediaQuery";

import { NotFound } from "components/NotFound";
import { SkeletonTicketRow } from "components/SkeletonTicketRow";
import { TicketRow } from "components/TicketRow";
import { CustomPagination } from "components/CustomPagination";

import { ITicket } from "components/TicketRow/ticket.interface";
import { dimensions } from "constants";

interface RenderElementsProps {
  tickets: ITicket[];
  title: string;
  isHaveBookmarks: boolean;
  handleDelete: ((ticketIdList: number[]) => void) | null;
  handleRestore: ((ticketIdList: number) => void) | null;
  setDeletedList: Dispatch<SetStateAction<number[]>> | null;
  totalPage: number;
  currentPage: number;
  isLoading: boolean;
}

const useRenderElements = ({
  tickets,
  title,
  isHaveBookmarks,
  handleDelete,
  handleRestore,
  setDeletedList,
  totalPage,
  currentPage,
  isLoading,
}: RenderElementsProps) => {
  const matches = useMediaQuery(
    `(min-width: ${dimensions.BREAK_POINTS.SIMPLE_TICKET}px)`
  );

  const renderSkeletonTickets = () => (
    <FormGroup
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonTicketRow
          matches={matches}
          isHaveActions={!!handleDelete || !!handleRestore}
          key={index}
        />
      ))}
    </FormGroup>
  );

  const renderTickets = () => (
    <>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
        }}
      >
        {tickets.map(ticket => (
          <TicketRow
            ticket={ticket}
            additionalAction={title}
            isHaveBookmarks={isHaveBookmarks}
            handleDelete={handleDelete}
            handleRestore={handleRestore}
            setDeletedList={setDeletedList}
            key={ticket.ticket_id}
          />
        ))}
      </FormGroup>
      {totalPage > 1 && (
        <CustomPagination total={totalPage} current={currentPage} />
      )}
    </>
  );

  const renderNotFound = () => !isLoading && <NotFound withPostscript={true} />;

  return { renderSkeletonTickets, renderTickets, renderNotFound };
};

export { useRenderElements };
