import React, { useState, useEffect } from 'react';
import "./MoodMap.scss";
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Chart from 'chart.js/auto';
import { registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

const MoodMap = () => {
    const [moodData, setMoodData] = useState([]);
    const [data, setData] = useState([]);
    const [currentGroup, setCurrentGroup] = useState('year');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTitle, setCurrentTitle] = useState('');

    Chart.register(...registerables);

    // const groups = {
    //     year: [Year],
    //     month: [Feb, Month],
    //     week: [Feb, Week1, Week2, Week3, Week4],
    // };


    // const handleChangeGroup = (group) => {
    //     setCurrentGroup(group);
    //     setCurrentIndex(0); // Reset index when changing group
    //     setCurrentTitle(groups[group][0].title);
    // };

    // const handlePrev = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : groups[currentGroup].length - 1));
    //     setCurrentTitle(groups[currentGroup][currentIndex].title);
    // };

    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex < groups[currentGroup].length - 1 ? prevIndex + 1 : 0));
    //     setCurrentTitle(groups[currentGroup][currentIndex].title);
    // };

    useEffect(() => {
        const fetchData = async () => {
            const moodlogsCollection = collection(db, 'moodlogs');
            const q = query(moodlogsCollection, orderBy('date'));

            try {
                const querySnapshot = await getDocs(q);
                const moodData = [];
                querySnapshot.forEach((doc) => {
                    moodData.push({ id: doc.id, ...doc.data() });
                });
                setMoodData(moodData);
                setData(moodData);
            } catch (error) {
                console.error('Error fetching mood data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const dates = moodData.map((entry) => entry.date.toDate()); // Convert Firestore Timestamp to JavaScript Date object
        const graphValues = moodData.map((entry) => entry.graphValue);

        // Create or update the chart
        const ctx = document.getElementById('scatterChart');
        if (!ctx) return;

        // Check if a chart with ID 'scatterChart' already exists
        const existingChart = window.myScatterChart;
        if (existingChart) {
            existingChart.destroy(); // Destroy the existing chart
        }

        window.myScatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Graph Values',
                        data: dates.map((date, index) => ({ x: date, y: graphValues[index] })),
                        backgroundColor: 'rgb(75, 192, 192)',
                        pointRadius: 5,
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
                            text: 'Graph Value',
                        },
                        min: 0, // Set minimum y-axis value to 0
                        max: 6, // Set maximum y-axis value to 6
                    },
                },
            },
        });
    }, [data]);

    const handleChangeGroup = (group) => {
        setCurrentGroup(group);
        setCurrentIndex(0); // Reset index when changing group
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : moodData.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < moodData.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <>
            <section className="map">
                <article className="map-slides">
                    <canvas className='map-slides__slide' id="scatterChart"></canvas>
                </article>
                <h2 className='map-title'>{currentTitle}</h2>
                <article className="map-controls">
                    <div className='map-controls-eq'>
                        <div className='map-groups'>
                            <button className="map-groups-group" onClick={() => handleChangeGroup('year')}>Yr</button>
                            <button className="map-groups-group" onClick={() => handleChangeGroup('month')}>Mo</button>
                            <button className="map-groups-group" onClick={() => handleChangeGroup('week')}>Wk</button>
                        </div>
                        <div className='map-arrows'>
                            <button className='map-arrows-arrow' onClick={handlePrev}>&lt;</button>
                            <button className='map-arrows-arrow' onClick={handleNext}>&gt;</button>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
};

export default MoodMap;
