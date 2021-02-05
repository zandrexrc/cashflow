import React, {useEffect} from 'react';

import Chart from 'chart.js';
import PropTypes from 'prop-types';


const BarChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById('barChart');
    const barChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: props.data,
      options: {
        responsive: false,
        animation: {
          duration: 0, // general animation time
        },
        hover: {
          animationDuration: 0, // animation when hovering an item
        },
        responsiveAnimationDuration: 0, // animation time after a resize
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              suggestedMin: 0,
              display: false,
            },
          }],
        },
      },
    });
    barChart.update();
    return () => barChart.destroy();
  });

  return (
    <canvas
      id="barChart"
      width={props.width}
      height={props.height}
    ></canvas>
  );
};

BarChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/bar.html) */
  data: PropTypes.object.isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
};

export {BarChart};
