import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ApiResponse, IQueue, IScope } from "../Queue";
import { useGetQueuesByFacultyMutation } from "../../../store/api/meta.api";

const scopeNames = ["Reports", "Q/A", "Suggestions"];

const useScopeList = ({ faculty }: { faculty: number }) => {
  const { t, i18n } = useTranslation();

  const [searchParams] = useSearchParams();
  const searchParamOrder = searchParams.get("order");

  const queue: number[] = searchParamOrder
    ? searchParamOrder.split(",").map(item => Number(item))
    : [];

  const defaultScopeList = scopeNames.map((name, index) => ({
    id: index + 1,
    order: queue[index] || index + 1,
    name,
    title: t(`queue.scopes.${name.toLowerCase()}Title`),
    queues: [],
  }));

  const [scopesList, setScopesList] = useState<IScope[]>(defaultScopeList);

  useEffect(() => {
    setScopesList(prevState => {
      const newScopeList = [...prevState];

      scopeNames.forEach((name, index) => {
        newScopeList[index].title = t(
          `queue.scopes.${name.toLowerCase()}Title`
        );
      });

      return newScopeList;
    });
  }, [i18n.language]);

  const mapScopeToIndex: { [key: string]: number } = {
    Reports: 0,
    "Q/A": 1,
    Suggestion: 2,
  };

  const [getQueues] = useGetQueuesByFacultyMutation({});

  useEffect(() => {
    getQueues({ body: JSON.stringify({ faculty: faculty }) }).then(
      (res: ApiResponse) => {
        const queuesData = res.data && res.data.queues_list;

        if (queuesData) {
          const newScopeList = [...scopesList].map(scope => ({
            ...scope,
            queues: [] as IQueue[],
          }));

          queuesData.forEach((queue: IQueue) => {
            const scopeIndex = mapScopeToIndex[queue.scope];

            if (typeof scopeIndex === "number") {
              newScopeList[scopeIndex].queues.push(queue);
            }
          });

          setScopesList(newScopeList);
        }
      }
    );
  }, [faculty]);

  const sortedScopesList = scopesList.sort((a, b) => a.order - b.order);

  return { scopesList, setScopesList, sortedScopesList };
};

export { useScopeList };
