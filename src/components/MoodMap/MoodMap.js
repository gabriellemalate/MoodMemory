import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import "./MoodMap.scss";

const MoodMap = () => {
    const chartRef = useRef(null);
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/states');
                setMoodData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (moodData && moodData.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            const formattedData = moodData.map(({ date, level }) => ({
                x: new Date(date),
                y: level,
            }));

            new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Mood Levels',
                            data: formattedData,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                            },
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Mood Level',
                            },
                        },
                    },
                },
            });
        }
    }, [moodData]);

    return (
        <div className="mood-chart">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default MoodMap;
