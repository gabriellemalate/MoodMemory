import './MoodMapsPage.scss';
import React, { useState, useEffect }  from 'react';
import MoodMap from "../../components/MoodMap/MoodMap"
// import MapControls from "../../components/MapControls/MapControls";
import Header from '../../components/Header/Header';
import axios from 'axios';

const MoodMapsPage = () => {
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {
        // fetch data from the server
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/moods/api/moods');
                setMoodData(response.data); // server returns an array of mood data
            } catch (error) {
                console.error('Error fetching mood data:', error);
            }
        };

        fetchData();
    }, []); // empty dependency array to run the effect only once

    return (
        <>
        <Header/>
            <main className='maps'>
                <div className='maps__eq'>
                    <h1>Your Maps</h1>

                    <h2>Mood State</h2>
                    <MoodMap moodData={moodData}/>

                    <h2>Sleep</h2>

                </div>
            </main>
        </>
    );
}

export default MoodMapsPage;