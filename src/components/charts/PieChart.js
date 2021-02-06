import React, {useEffect} from 'react';

import Chart from 'chart.js';
import PropTypes from 'prop-types';


const PieChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById('pieChart');
    const pieChart = new Chart(ctx, {
      type: props.type,
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
      },
    });
    pieChart.update();
    return () => pieChart.destroy();
  });

  return (
    <canvas
      id="pieChart"
      width={props.width}
      height={props.height}
    ></canvas>
  );
};

PieChart.propTypes = {
  /** The data to be displayed.
   * (refer to: https://www.chartjs.org/docs/latest/charts/doughnut.html) */
  data: PropTypes.object.isRequired,
  /** The height of the chart (pixel value or 'auto') */
  height: PropTypes.string.isRequired,
  /** The width of the chart (pixel value or 'auto') */
  width: PropTypes.string.isRequired,
  /** The type of the chart ('doughnut' | 'pie') */
  type: PropTypes.string.isRequired,
};

export {PieChart};
