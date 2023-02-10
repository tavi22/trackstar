import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useFetchTransactionsQuery } from '../../services/transactionsApi';
import { Spinner } from 'react-bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Monthly chart: Expenses vs Earnings',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const Analytics = () => {
  const {data:transactions, isLoading} = useFetchTransactionsQuery();

  if (isLoading) {
    return <Spinner className='me-2 ms-5 mt-5'
            style={{ width: '3rem', height: '3rem'}} animation="border" />
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: labels.map((label) => {
          let sum = 0;
          transactions.forEach(transaction => {
            const date = new Date(transaction.timestamp.seconds*1000).toLocaleString('default', { month: 'long' });
            if (date === label) {
              if (transaction.type === 'false') {
                sum += parseInt(transaction.amount);
              }
            }
          });
          return sum;
          }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Earnings',
        data: labels.map((label) => {
          let sum = 0;
          transactions.forEach(transaction => {
            const date = new Date(transaction.timestamp.seconds*1000).toLocaleString('default', { month: 'long' });
            if (date === label) {
              if (transaction.type === 'true') {
                sum += parseInt(transaction.amount);
              }
            }
          });
          return sum;
          }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  return ( 
    <MDBContainer>
      <Line options={options} data={data} />;
    </MDBContainer>
  );
}

export default Analytics;