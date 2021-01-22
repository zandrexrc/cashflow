import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'chart.js';


const LineChart = props => {
    const theme = useTheme();

    useEffect(() => {
        const ctx = document.getElementById('lineChart');
        const lineChart = new Chart(ctx, {
            type: 'line',
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
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: props.yAxisLabel,
                            fontColor: theme.palette.text.primary
                        },
                        ticks: {
                            fontColor: theme.palette.text.secondary
                        },
                        gridLines: {
                            color: theme.palette.action.focus
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: props.xAxisLabel,
                            fontColor: theme.palette.text.primary
                        },
                        ticks: {
                            fontColor: theme.palette.text.secondary
                        },
                        gridLines: {
                            color: theme.palette.action.focus
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: theme.palette.text.secondary
                    }
                }
            }
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
    )
}

// PropTypes
LineChart.propTypes = {
    data: PropTypes.object.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    xAxisLabel: PropTypes.string.isRequired,
    yAxisLabel: PropTypes.string.isRequired,
};

export { LineChart };