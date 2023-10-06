import { BarChart } from '@mui/x-charts/BarChart';

const OrderCountChart = ({ countChart }) => {

  console.log(countChart, "countChart")

  return (
    <>
      {countChart && countChart?.series?.length !== 0 && (
        <BarChart
          sx={{ height: "auto !important", width: "100% !important", ".MuiChartsLegend-root": { display: "none" }, ".MuiBarElement-root": { fill: "var(--theme)" } }}
          width={700}
          height={350}
          series={countChart?.series}
          xAxis={countChart?.xAxis}
        />
      )}
    </>
  )
}

export default OrderCountChart