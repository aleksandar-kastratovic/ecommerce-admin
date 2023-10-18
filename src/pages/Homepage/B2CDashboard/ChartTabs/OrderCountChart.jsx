import { BarChart } from '@mui/x-charts/BarChart';
import { transform } from 'lodash';

const OrderCountChart = ({ countChart }) => {

  return (
    <>
      {countChart && countChart?.series?.length !== 0 && (
        <BarChart
          sx={{ height: "auto !important", width: "100% !important", ".MuiChartsLegend-root": { display: "none" }, ".MuiBarElement-root": { fill: "var(--theme)" }, ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": { transform: "rotate(90deg)", textAnchor: "start !important", dominantBaseline: "auto !important" } }}
          width={1000}
          height={350}
          series={countChart?.series}
          xAxis={countChart?.xAxis}
        />
      )}
    </>
  )
}

export default OrderCountChart