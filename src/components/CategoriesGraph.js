import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'chart.js';


const CategoriesGraph = props => {
    const theme = useTheme();

    useEffect(() => {
        const ctx = document.getElementById('categoryChart');
        const categoryChart = new Chart(ctx, {
            type: 'pie',
            data: props.data,
            options: {
                responsive: true,
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // animation when hovering an item
                },
                responsiveAnimationDuration: 0, // animation time after a resize
                legend: {
                    labels: {
                        fontColor: theme.palette.text.secondary
                    }
                }
            }
        });
        categoryChart.update();
        return () => categoryChart.destroy();
    });

    return (
        <canvas 
            id="categoryChart" 
            width={props.width} 
            height={props.height}
        ></canvas>
    )
}

// PropTypes
CategoriesGraph.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export { CategoriesGraph };