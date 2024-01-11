import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useGetFacultiesQuery,
  useGetStatusesQuery,
} from "../../../store/api/meta.api";

interface GetRequestBodyProps {
  currentPage: number;
  ticketsPerRow: number;
  option: string;
}

const useGetRequestBody = ({
  currentPage,
  ticketsPerRow,
  option,
}: GetRequestBodyProps) => {
  const { data: statuses, isSuccess: isStatusesSuccess } = useGetStatusesQuery(
    {}
  );
  const { data: faculties, isSuccess: isFacultiesSuccess } =
    useGetFacultiesQuery({});

  const [searchParams] = useSearchParams();
  const facultyQuery: string | null = searchParams.get("faculty");

  const matchingStatusesId = useMemo(() => {
    let matchingStatusesId: number[] = [];

    if (isStatusesSuccess) {
      const statusList: IStatus[] = statuses?.statuses_list;

      const statusesQuery = searchParams
        .get("statuses")
        ?.split(",")
        .map((status: string) => status.toUpperCase());

      for (const status of statusList) {
        if (statusesQuery && statusesQuery.includes(status.name)) {
          matchingStatusesId.push(status.status_id);
        }
      }
    }

    return matchingStatusesId;
  }, [statuses, searchParams]);

  const facultyId = useMemo(() => {
    let facultyId: number | null = null;

    if (isFacultiesSuccess) {
      if (facultyQuery === "all") {
        facultyId = null;
      } else {
        facultyId = faculties.faculties_list.find(
          (faculty: IFaculty) => faculty.name === facultyQuery
        )?.faculty_id;
      }
    }

    return facultyId;
  }, [faculties, facultyQuery]);

  const requestBody = useMemo(() => {
    const data: {
      start_page: number;
      items_count: number;
      faculty: number | null;
      status: number[];
    } = {
      start_page: currentPage,
      items_count: ticketsPerRow * 4,
      faculty: facultyId,
      status: matchingStatusesId,
    };

    return data;
  }, [currentPage, facultyId, matchingStatusesId, ticketsPerRow, option]);

  return requestBody;
};

export { useGetRequestBody };
