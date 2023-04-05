import { Grid } from "@mui/material";
import { Card, Title, LineChart } from "@tremor/react";
import { useSelector } from "react-redux";

// const chartdata  = [
//   {
//     year: 1951,
//     "Population growth rate": 1.74,
//   },
//   {
//     year: 1952,
//     "Population growth rate": 1.93,
//   },
//   {
//     year: 1953,
//     "Population growth rate": 1.9,
//   },
//   {
//     year: 1954,
//     "Population growth rate": 1.98,
//   },
//   {
//     year: 1955,
//     "Population growth rate": 2,
//   },
// ];

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const salesData = sales.map((item) => ({
    date: item.createds,
    Sale: Number(item.price_total),
  }));

  const purchaseData = purchases.map((item) => ({
    date: item.createds,
    Purchase: Number(item.price_total),
  }));

  return (
    <Grid container justifyContent={"center"} spacing={3} mt={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <Title>Total Sales</Title>
          <LineChart
            data={salesData}
            index="date"
            categories={["Sale"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            // yAxisWidth={40}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card>
          <Title>Total Purchases</Title>
          <LineChart
            data={purchaseData}
            index="date"
            categories={["Purchase"]}
            colors={["red"]}
            valueFormatter={dataFormatter}
            // yAxisWidth={40}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
