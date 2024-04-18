import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import Box from '@mui/material/Box'

import { StatisticCard } from 'components/StatisticCard'
import { StatusTile } from './components/StatusTile'

import { IPeriodStatus } from '../../Statistic'
import { statuses } from 'constants/statuses'

ChartJS.register(ArcElement, Tooltip)

interface StatusesStatisticProps {
  statusesStatistic: IPeriodStatus[]
}

const StatusesStatistic: FC<StatusesStatisticProps> = ({
  statusesStatistic,
}) => {
  const { t } = useTranslation()

  const ticketsCount = statusesStatistic
    .map(status => status.tickets_count)
    .reduce((partialSum, a) => partialSum + a, 0)

  const colors = {
    [statuses.ACCEPTED]: '224, 156, 54',
    [statuses.CLOSED]: '104, 182, 81',
    [statuses.NEW]: '255, 255, 255',
    [statuses.OPEN]: '41, 130, 211',
    [statuses.REJECTED]: '217, 75, 68',
    [statuses.WAITING]: '158, 61, 255',
  }

  const data = {
    labels: statusesStatistic.map(status =>
      t(`statusesFilter.${status.name.toLowerCase()}`)
    ),
    datasets: [
      {
        data: statusesStatistic.map(status => status.tickets_count || 0),
        backgroundColor: statusesStatistic.map(
          status => `rgba(${colors[status.name.toLowerCase()]}, 1)`
        ),
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }

  const doughnutLabel = {
    id: 'doughnutLabel',
    beforeDatasetsDraw(chart) {
      const { ctx } = chart

      ctx.save()
      const xCoord = chart.getDatasetMeta(0).data[0].x
      const yCoord = chart.getDatasetMeta(0).data[0].y
      ctx.font = '600 56px Inter'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.48)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(ticketsCount, xCoord, yCoord - 10)

      ctx.font = '500 20px Inter'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.80)'
      ctx.fillText(t('common.tickets'), xCoord, yCoord + 30)
    },
  }

  return (
    <StatisticCard
      title={'systemStatus'}
      width={300}
      styles={{ gridArea: 'statuses' }}
    >
      <>
        <Box sx={{ width: 200, m: '0 auto' }}>
          <Doughnut data={data} plugins={[doughnutLabel]} />
        </Box>
        <Box sx={{ fontSize: 14 }}>
          {statusesStatistic.map(status => {
            const { tickets_count, name, status_id } = status

            return (
              <StatusTile
                count={tickets_count}
                title={name}
                color={colors[name.toLowerCase()]}
                key={status_id}
              />
            )
          })}
        </Box>
      </>
    </StatisticCard>
  )
}

export { StatusesStatistic }
