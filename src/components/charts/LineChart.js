import React, {useEffect} from 'react';

import {useTheme} from '@material-ui/core/styles';
import Chart from 'chart.js';
import PropTypes from 'prop-types';


const LineChart = (props) => {
  const theme = useTheme();

  useEffect(() => {
    const ctx = document.getElementById('lineChart');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: props.data,
      options: {
        responsive: true,
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // animation when hovering an item
        },
        responsiveAnimationDuration: 0, // animation time after a resize
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: props.yAxisLabel,
              fontColor: theme.palette.text.primary,
            },
            ticks: {
              fontColor: theme.palette.text.secondary,
            },
            gridLines: {
              color: theme.palette.action.focus,
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: props.xAxisLabel,
              fontColor: theme.palette.text.primary,
            },
            ticks: {
              fontColor: theme.palette.text.secondary,
            },
            gridLines: {
              color: theme.palette.action.focus,
            },
          }],
        },
        legend: {
          labels: {
            fontColor: theme.palette.text.secondary,
          },
        },
      },
    });
    lineChart.update();
    return () => lineChart.destroy();
  });

  return (
    <canvas
      id="lineChart"
      width={props.width}
      height={props.height}
    ></canvas>
  );
};

LineChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/line.html) */
  data: PropTypes.object.isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
  /** The label on the x-axis */
  xAxisLabel: PropTypes.string.isRequired,
  /** The label on the y-axis */
  yAxisLabel: PropTypes.string.isRequired,
};

export {LineChart};
