import { BarChart } from '@mui/x-charts/BarChart';

const OrderAmountChart = ({ amountChart }) => {
  return (
    <>
      {amountChart && amountChart?.series?.length !== 0 && (
        <BarChart
          sx={{ height: "auto !important", width: "100% !important", ".MuiChartsLegend-root": { display: "none" }, ".MuiBarElement-root": { fill: "var(--theme)" }, ".MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": { transform: "rotate(90deg)", textAnchor: "start !important", dominantBaseline: "auto" } }}
          width={1000}
          height={350}
          series={amountChart?.series}
          xAxis={amountChart?.xAxis}
        />
      )}
    </>
  )
}

export default OrderAmountChart