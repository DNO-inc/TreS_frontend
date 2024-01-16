import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useGetFacultiesQuery,
  useGetStatusesQuery,
} from "../../../store/api/meta.api";

interface GetRequestBodyProps {
  currentPage: number;
  option?: "bookmarked" | "followed" | "tickets";
  userId?: boolean | number;
  assignee?: number;
}

const useGetRequestBody = ({
  currentPage,
  option,
  userId,
  assignee,
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
  }, [searchParams]);

  const facultyData = useMemo(() => {
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
  }, [facultyQuery]);

  const requestBody = useMemo(() => {
    const data: {
      creator?: number | boolean | undefined;
      assignee?: number;
      start_page: number;
      faculty: number | null;
      status: number[];
      bookmarks_type?: string;
    } = {
      start_page: currentPage,
      faculty: facultyData,
      status: matchingStatusesId,
    };

    if (option === "tickets") {
      data.creator = userId;
    }

    if (assignee) {
      data.assignee = assignee;
    }

    return data;
  }, [currentPage, facultyData, matchingStatusesId, userId, option, assignee]);

  return requestBody;
};

export { useGetRequestBody };
