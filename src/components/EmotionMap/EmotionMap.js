import './EmotionMap.scss';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function EmotionMap({ moodLogs }) {
    const [emotionData, setEmotionData] = useState([]);

    useEffect(() => {
        // Extract emotion data from moodLogs
        const extractedData = moodLogs.map(log => log.emotion);
        setEmotionData(extractedData);
    }, [moodLogs]);

    useEffect(() => {
        // Create scatterplot when emotionData changes
        createScatterPlot();
    }, [emotionData]);

    let emotionChart = null; // Variable to store the chart instance

    const createScatterPlot = () => {
        const ctx = document.getElementById('emotionChart');

        if (!ctx || !emotionData.length) return;

        const labels = emotionData.map((_, index) => index + 1); // Generate labels (1, 2, 3, ...)
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

        // Destroy existing chart if it exists
        if (emotionChart) {
            emotionChart.destroy();
        }

        // Create new chart
        emotionChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Emotions',
                    data: data,
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
                        title: {
                            display: true,
                            text: 'Log Number'
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