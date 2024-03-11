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
//         const fetchData = async () => {
//             const moodlogsCollection = collection(db, 'moodlogs');
//             const q = query(moodlogsCollection, orderBy('date'));

//             try {
//                 const querySnapshot = await getDocs(q);
//                 const moodData = [];
//                 querySnapshot.forEach((doc) => {
//                     moodData.push({ id: doc.id, ...doc.data() });
//                 });
//                 setMoodData(moodData);
//                 setData(moodData);
//             } catch (error) {
//                 console.error('Error fetching mood data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const createOrUpdateChart = () => {
//             const dates = moodData.map((entry) => entry.date.toDate());
//             const graphValues = moodData.map((entry) => entry.graphValue);

//             const ctx = document.getElementById('scatterChart');
//             if (!ctx) return;

//             const existingChart = window.myScatterChart;
//             if (existingChart) {
//                 existingChart.destroy();
//             }

//         window.myScatterChart = new Chart(ctx, {
//             type: 'scatter',
//             data: {
//                 labels: dates,
//                 datasets: [
//                     {
//                         label: 'Graph Values',
//                         data: dates.map((date, index) => ({ x: date, y: graphValues[index] })),
//                         backgroundColor: 'rgb(75, 192, 192)',
//                         pointRadius: 10,
//                     },
//                 ],
//             },
//             options: {
//                 scales: {
//                     x: {
//                         type: 'time',
//                         time: {
//                             unit: currentGroup === 'year' ? 'year' : (currentGroup === 'month' ? 'month' : 'day'),
//                         },
//                         title: {
//                             display: true,
//                             text: 'Date',
//                         },
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Graph Value',
//                         },
//                         min: 0, 
//                         max: 6, 
//                     },
//                 },
//             },
//         });
//     };

//     const getGraphData = () => {
//         if (currentGroup === 'year') {
//             // Get data for the current year
//             const currentDate = new Date();
//             const year = currentDate.getFullYear();
//             return moodData.filter(entry => entry.date.toDate().getFullYear() === year).map(entry => ({ x: entry.date.toDate(), y: entry.graphValue }));
//         } else if (currentGroup === 'month') {
//             // Get data for the current month
//             const currentDate = new Date();
//             const year = currentDate.getFullYear();
//             const month = currentDate.getMonth();
//             return moodData.filter(entry => entry.date.toDate().getFullYear() === year && entry.date.toDate().getMonth() === month).map(entry => ({ x: entry.date.toDate(), y: entry.graphValue }));
//         } else if (currentGroup === 'week') {
//             // Get data for the current week
//             const currentDate = new Date();
//             const currentWeek = getWeekNumber(currentDate);
//             return moodData.filter(entry => getWeekNumber(entry.date.toDate()) === currentWeek).map(entry => ({ x: entry.date.toDate(), y: entry.graphValue }));
//         }
//         return [];
//     };

//     const getWeekNumber = (date) => {
//         const d = new Date(date);
//         d.setHours(0, 0, 0, 0);
//         d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
//         const week1 = new Date(d.getFullYear(), 0, 4);
//         return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
//     };

//     createOrUpdateChart();
// }, [moodData, currentGroup]);

useEffect(() => {
    fetchData();
}, []);

useEffect(() => {
    createOrUpdateChart();
}, [moodData, currentGroup, currentIndex]);

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
    } catch (error) {
        console.error('Error fetching mood data:', error);
    }
};

const createOrUpdateChart = () => {
    const ctx = document.getElementById('scatterChart');
    if (!ctx) return;

    const existingChart = window.myScatterChart;
    if (existingChart) {
        existingChart.destroy();
    }

    const graphData = getGraphData();
    window.myScatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Graph Values',
                    data: graphData,
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
                        unit: currentGroup === 'year' ? 'year' : (currentGroup === 'month' ? 'day' : 'day'),
                        tooltipFormat: 'MMM DD, yyyy', // Format for tooltip
                        displayFormats: {
                            day: 'MMM DD, yyyy', // Format for displaying day labels
                            month: 'MMM yyyy',   // Format for displaying month labels
                            year: 'yyyy'         // Format for displaying year labels
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Mood State',
                    },
                    min: 0, 
                    max: 6, 
                    ticks: {
                        callback: function(value, index, values) {
                            switch(value) {
                                case 0:
                                    return 'D-Sev';
                                case 1:
                                    return 'D-Mod';
                                case 2:
                                    return 'D-Mil';
                                case 3:
                                    return 'WNL';
                                case 4:
                                    return 'E-Mil';
                                case 5:
                                    return 'E-Mod';
                                case 6:
                                    return 'E-Sev';
                                default:
                                    return '';
                            }
                        }
                    }
                },
            },
        },
    });
};

const getGraphData = () => {
    if (currentGroup === 'year') {
        return moodData.map((entry) => ({ x: entry.date.toDate(), y: entry.graphValue }));
    } else if (currentGroup === 'month') {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return moodData.filter(entry => entry.date.toDate().getFullYear() === year && entry.date.toDate().getMonth() === month).map(entry => ({ x: entry.date.toDate(), y: entry.graphValue }));
    } else if (currentGroup === 'week') {
        const currentDate = new Date();
        const currentWeek = getWeekNumber(currentDate);
        return moodData.filter(entry => getWeekNumber(entry.date.toDate()) === currentWeek).map(entry => ({ x: entry.date.toDate(), y: entry.graphValue }));
    }
    return [];
};

const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

const handleChangeGroup = (group) => {
    setCurrentGroup(group);
    if (group === 'year') {
        setCurrentTitle('Year');
    } else if (group === 'month') {
        setCurrentTitle('Month');
    } else if (group === 'week') {
        setCurrentTitle('Week');
    }
};

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            } else {
                // If currentIndex is 0, and we're on year view, we can't go back further
                if (currentGroup === 'year') {
                    return 0;
                }
                // For month view, go back to the previous month
                else if (currentGroup === 'month') {
                    // Adjust the date to the beginning of the current month
                    const currentDate = new Date();
                    currentDate.setMonth(currentDate.getMonth() - 1);
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const prevMonthData = moodData.filter(entry => entry.date.toDate().getFullYear() === year && entry.date.toDate().getMonth() === month);
                    if (prevMonthData.length > 0) {
                        return moodData.findIndex(entry => entry.id === prevMonthData[prevMonthData.length - 1].id);
                    }
                    // If there's no data for the previous month, stay on the current month
                    return prevIndex;
                }
                // For week view, go back to the previous week
                else if (currentGroup === 'week') {
                    // Adjust the date to the beginning of the current week
                    const currentDate = new Date();
                    const currentWeek = getWeekNumber(currentDate);
                    const prevWeekData = moodData.filter(entry => getWeekNumber(entry.date.toDate()) === currentWeek - 1);
                    if (prevWeekData.length > 0) {
                        return moodData.findIndex(entry => entry.id === prevWeekData[prevWeekData.length - 1].id);
                    }
                    // If there's no data for the previous week, stay on the current week
                    return prevIndex;
                }
            }
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            // For year view, if there's more data ahead, go to the next index
            if (currentGroup === 'year') {
                if (prevIndex < moodData.length - 1) {
                    return prevIndex + 1;
                }
                return prevIndex;
            }
            // For month view, go to the next month
            else if (currentGroup === 'month') {
                // Adjust the date to the beginning of the next month
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + 1);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const nextMonthData = moodData.filter(entry => entry.date.toDate().getFullYear() === year && entry.date.toDate().getMonth() === month);
                if (nextMonthData.length > 0) {
                    return moodData.findIndex(entry => entry.id === nextMonthData[0].id);
                }
                // If there's no data for the next month, stay on the current month
                return prevIndex;
            }
            // For week view, go to the next week
            else if (currentGroup === 'week') {
                // Adjust the date to the beginning of the next week
                const currentDate = new Date();
                const currentWeek = getWeekNumber(currentDate);
                const nextWeekData = moodData.filter(entry => getWeekNumber(entry.date.toDate()) === currentWeek + 1);
                if (nextWeekData.length > 0) {
                    return moodData.findIndex(entry => entry.id === nextWeekData[0].id);
                }
                // If there's no data for the next week, stay on the current week
                return prevIndex;
            }
        });
    };

    // const handlePrev = () => {
    //     setCurrentIndex((prevIndex) => {
    //         if (prevIndex > 0) {
    //             return prevIndex - 1;
    //         }
    //         return prevIndex;
    //     });
    // };

    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => {
    //         if (prevIndex < moodData.length - 1) {
    //             return prevIndex + 1;
    //         }
    //         return prevIndex;
    //     });
    // };


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
