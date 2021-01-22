import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';


const PieChart = props => {

    useEffect(() => {
        const ctx = document.getElementById('pieChart');
        const pieChart = new Chart(ctx, {
            type: props.type,
            data: props.data,
            options: {
                responsive: false,
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // animation when hovering an item
                },
                responsiveAnimationDuration: 0, // animation time after a resize
                legend: {
                    display: false
                }
            }
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
    )
}

// PropTypes
PieChart.propTypes = {
    data: PropTypes.object.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export { PieChart };