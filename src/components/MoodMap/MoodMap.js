import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';
import "./MoodMap.scss";

const MoodMap = ({ moodData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        let myChart = null;

        const updateChart = () => {
            if (myChart) {
                myChart.destroy(); // Destroy the existing chart if it exists
            }

            if (moodData && moodData.length > 0) {
                // Extracts data for labels, state, and level
                const labels = moodData.map(entry => {
                    // Converts timestamp to 'Month Day' format using date-fns
                    return format(new Date(entry.timestamp), 'MMM d');
                });
                const stateData = moodData.map(entry => entry.state);
                // const levelData = moodData.map(entry => entry.level);

                const ctx = chartRef.current.getContext('2d');

                // The line chart
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Mood State',
                                data: stateData,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 2,
                                fill: false,
                            },
                            // {
                            //     label: 'Level',
                            //     data: levelData,
                            //     borderColor: 'rgba(255, 99, 132, 1)',
                            //     borderWidth: 2,
                            //     fill: false,
                            // },
                        ],
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                labels: labels,
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                type: 'category',
                                position: 'left',
                                labels: [
                                    'Elevated Severe',
                                    'Elevated Moderate',
                                    'Elevated Mild',
                                    'WNL',
                                    'Depressed Mild',
                                    'Depressed Moderate',
                                    'Depressed Severe',
                                ],
                                title: {
                                    display: true,
                                    text: 'Mood State',
                                },
                            },
                        },
                    },
                });
            }
        };

        updateChart();

        return () => {
            if (myChart) {
                myChart.destroy(); // cleanup on component unmount
            }
        };

    }, [moodData]);

    return <canvas ref={chartRef} />;
};

export default MoodMap;