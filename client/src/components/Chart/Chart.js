import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ChartJs from 'chart.js';

const initChart = (ref, xData, yData) => {
  const ctx = ref.getContext('2d');
  const chart = new ChartJs(ctx, {
    type: 'line',
    data: {
      labels: xData || [1, 2, 3, 4, 5, 6, 7],
      datasets: [{
        fill: false,
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderWidth: 0,
        data: yData || [10, 20, 30, 40, 50, 60, 70],
      }],
    },
    options: {
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          title(item) {
            if (item.length > 0)
              return item[0].label
          },
          label(item) {
            console.log(item)
            return item.value
          }
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(58, 58, 58, 1)',
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            maxTicksLimit: 6,
            fontSize: 10,
            padding: 4
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(58, 58, 58, 1)',
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            min: 0,
            maxTicksLimit: 6,
            fontSize: 10,
            padding: 10
          }
        }]
      }
    },
  });
};

const Chart = ({id, xData, yData}) => {
  let ref = null;

  useEffect(() => {
    initChart(ref);
  });

  return (
    <canvas
      id={id}
      height="170"
      ref={(r) => {
        ref = r;
      }}
    />
  );
};

Chart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Chart;
