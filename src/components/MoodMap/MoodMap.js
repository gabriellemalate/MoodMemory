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
                    // Check if the timestamp is a valid number
                    const timestamp = entry.timestamp;
                    if (!isNaN(timestamp) && isFinite(timestamp)) {
                        // Convert timestamp to a Date object
                        const date = new Date(timestamp);
                        // Format the date using date-fns
                        const formattedDate = format(date, 'MM-dd');
                        return formattedDate;
                    } else {
                        console.error('Invalid timestamp:', timestamp);
                        return null;
                    }
                });

                // Combine state and level values for the y-axis
                const combinedStateData = moodData.map(entry => {
                    const state = entry.state || '';
                    const level = entry.level || '';
                    return `${state} ${level}`;
                });

                const ctx = chartRef.current.getContext('2d');

                // The line chart
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Mood State',
                                data: combinedStateData,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 2,
                                fill: false,
                            }
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
                                // ticks: {
                                //     callback: (value, index, values) => {
                                //         // Check if the value is a string and contains a space
                                //         if (typeof value === 'string' && value.includes(' ')) {
                                //             return `${value} ${value.split(' ')[1]}`;
                                //         }
                                //         return value;
                                //     },
                                // },

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