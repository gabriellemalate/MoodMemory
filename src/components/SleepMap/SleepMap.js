import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, orderBy, getDocs, where } from 'firebase/firestore';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

const SleepMap = () => {
    const [sleepData, setSleepData] = useState([]);

    Chart.register(...registerables);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        createOrUpdateChart();
    }, [sleepData]);

    const fetchData = async () => {
        if (!auth.currentUser) {
            // If no user is logged in, set sleep data to an empty array
            setSleepData([]);
            return;
        }

        const sleepLogsCollection = collection(db, 'sleepLogs');
        const q = query(
            sleepLogsCollection,
            where('uid', '==', auth.currentUser.uid),
            orderBy('date')
        );

        try {
            const querySnapshot = await getDocs(q);
            const sleepData = [];
            querySnapshot.forEach((doc) => {
                sleepData.push({ id: doc.id, ...doc.data() });
            });
            setSleepData(sleepData);
        } catch (error) {
            console.error('Error fetching sleep data:', error);
        }
    };

    const createOrUpdateChart = () => {
        const ctx = document.getElementById('sleepChart');
        if (!ctx) return;

        let existingChart = window.sleepChart;

        if (existingChart instanceof Chart) {
            existingChart.destroy();
        }

        const graphData = getGraphData();
        const startDate = getStartDate();
        const endDate = new Date();

        window.sleepChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Sleep Quality',
                        data: graphData.map(entry => ({ x: entry.date, y: entry.quality, r: 5 })),
                        backgroundColor: 'blue',
                    },
                    {
                        label: 'Sleep Hours',
                        data: graphData.map(entry => ({ x: entry.date, y: entry.hours, r: 5 })),
                        backgroundColor: 'green',
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'MMM dd, yyyy', // Format for tooltip
                            displayFormats: {
                                day: 'MMM dd, yyyy', // Format for displaying day labels
                            },
                            min: startDate,
                            max: endDate
                        },
                        title: {
                            display: true,
                            text: 'Date',
                        },
                        ticks: {
                            autoSkip: false,
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Sleep',
                        },
                        min: 0,
                        max: 12,
                        ticks: {
                            autoSkip: false,
                            callback: function (value, index, values) {
                                if (value === 0) return 'Poor';
                                if (value === 4) return 'Okay';
                                if (value === 8) return 'Good';
                                if (value === 12) return 'Awesome';
                                return '';
                            }
                        }
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const date = new Date(context.parsed.x);
                                const quality = context.datasetIndex === 0 ? 'Quality' : 'Hours';
                                const value = context.parsed.y;
                                return `${quality}: ${value}`;
                            }
                        }
                    }
                }
            },
        });
    };

    const getGraphData = () => {
        // Assuming sleepData contains objects with properties 'date', 'quality', and 'hours'
        return sleepData;
    };

    const getStartDate = () => {
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        return startDate;
    };

    return (
        <div className="sleep-chart-container">
            <canvas id="sleepChart"></canvas>
        </div>
    );
};

export default SleepMap;
