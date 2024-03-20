import './EmotionMap.scss';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function EmotionMap({ moodLogs }) {
    const [emotionData, setEmotionData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        // Extract emotion data from moodLogs
        const extractedData = moodLogs.map(log => log.emotion);
        setEmotionData(extractedData);
    }, [moodLogs]);

    useEffect(() => {
        // Create scatterplot when emotionData changes
        createScatterPlot();
        return () => {
            // Clean up function to destroy the chart instance when component unmounts
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [emotionData]);


    const createScatterPlot = () => {

        const ctx = document.getElementById('emotionChart');

        if (!ctx || !emotionData.length) return;

        if (chartInstance) {
            chartInstance.destroy();
        }

        const labels = moodLogs.map(log => {
            const logDate = new Date(log.date.toDate());
            // Format date as desired (e.g., MM/DD/YYYY)
            return `${logDate.getMonth() + 1}/${logDate.getDate()}/${logDate.getFullYear()}`;
        });

        const xData = moodLogs.map(log => {
            const logDate = new Date(log.date.toDate());
            return logDate;
        });

        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const firstLogDate = xData.length > 0 ? xData[0] : new Date();
        const lastLogDate = xData.length > 0 ? xData[xData.length - 1] : new Date();

        const data = emotionData.map(emotion => {
            // Assign numerical values to emotions
            switch (emotion) {
                case 'exhausted':
                case 'hopeless':
                case 'panic':
                    return 0;
                case 'frustrated':
                case 'angry':
                case 'down':
                    return 1;
                case 'anxious':
                case 'blue':
                case 'sad':
                    return 2;
                case 'irritable':
                case 'worried':
                case 'stressed':
                    return 3;
                case 'tired':
                case 'unmotivated':
                    return 4;
                case 'unsure':
                case 'wired':
                    return 5;
                case 'happy':
                case 'loving':
                case 'relaxed':
                case 'satisfied':
                case 'grateful':
                    return 6;
                case 'motivated':
                case 'excited':
                case 'proud':
                case 'energized':
                    return 7;
                default:
                    return 0; // Default to 0 if emotion is not recognized
            }
        });

        if (data.length === 0) return;

        // Create new chart
        const newChartInstance = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Emotions',
                    data: moodLogs.map(log => ({
                        x: new Date(log.date.toDate()), // Use logDate for x-axis
                        y: data[moodLogs.indexOf(log)] // Use emotion data for y-axis
                    })),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time', // Use time scale for x-axis
                        time: {
                            unit: 'day', // Display dates by day
                            min: firstLogDate,
                            max: lastLogDate
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Emotion Level'
                        },
                        min: 0
                    }
                }
            }
        });
        setChartInstance(newChartInstance);
    };

    return (
        <>
            <div className="emotion-map">
                <h2 className="emotion-map__title">Emotion Map</h2>
                <canvas id="emotionChart" width="400" height="200"></canvas>
            </div>
        </>
    )
}

export default EmotionMap;