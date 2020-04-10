import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ChartJs from 'chart.js';

const initChart = (ref, target, data) => {
  let xData = data.map(x => {
    let d = new Date(x.timestamp * 1000);
    return `${d.getMonth() + 1}/${d.getDate()}`
  });

  let yData = data.map(x => {
    let value = x[target];

    if(target === 'price') {
      value = value.toFixed(2);
    }

    return value;
  });


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
        titleFontStyle: 'normal',
        titleAlign: 'center',
        titleFontSize: 12,
        bodyFontColor: "rgba(255, 255, 255, 0.7)",
        bodyFontSize: 12,
        bodyAlign: 'center',
        xPadding: 10,
        callbacks: {
          title(item) {
            if (item.length > 0)
              return item[0].value + `${target === 'price' ? ' USD' : ''}`
          },
          label(item) {
            return item.label
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
            padding: 8
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

const Chart = ({id, target, height, data}) => {
  let ref = null;

  useEffect(() => {
    initChart(ref, target, data);
  });

  return (
    <canvas
      id={id}
      height={height}
      ref={(r) => {
        ref = r;
      }}
    />
  );
};

Chart.propTypes = {
  id: PropTypes.string.isRequired,
  key: PropTypes.string,
  data: PropTypes.array,
  height: PropTypes.number
};

export default Chart;
