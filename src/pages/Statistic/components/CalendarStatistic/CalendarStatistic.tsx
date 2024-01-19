import { FC } from "react";

import { StatisticCard } from "components/StatisticCard";
import { TicketsCount } from "./components/TicketsCount";
import { ScopesStatistic } from "./components/ScopesStatistic";

export interface IScope {
  date: string;
  scope: string;
  tickets_count: number;
}

interface CalendarStatisticProps {
  calendarStatistic: IScope[];
}

const CalendarStatistic: FC<CalendarStatisticProps> = ({
  calendarStatistic,
}) => {
  const ticketsCount = 25;

  return (
    <StatisticCard
      title={"calendarStatistic"}
      width={320}
      styles={{ gridArea: "calendar" }}
    >
      <>
        <TicketsCount ticketsCount={ticketsCount} />
        <ScopesStatistic calendarStatistic={calendarStatistic} />
      </>
    </StatisticCard>
  );
};

export { CalendarStatistic };
