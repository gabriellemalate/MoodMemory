import React, { useState } from 'react';
import "./MoodMap.scss";
import Year from "../../assets/chart/yr-mob.png";
import Feb from "../../assets/chart/feb-mob.png";
import Month from "../../assets/chart/mo-jan3-mob.png";
import Week4 from "../../assets/chart/jan-wk4-mob.png";
import Week3 from "../../assets/chart/jan-wk3-mob.png"
import Week2 from "../../assets/chart/jan-wk2-mob.png"
import Week1 from "../../assets/chart/jan-wk1-mob.png"

const MoodMap = () => {
    const [currentGroup, setCurrentGroup] = useState('year');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTitle, setCurrentTitle] = useState('');

    const groups = {
        year: [{ Year, title: 'Year Title' }],
        month: [Feb, Month],
        week: [Feb, Week1, Week2,  Week3, Week4],
    };

    const handleChangeGroup = (group) => {
        setCurrentGroup(group);
        setCurrentIndex(0); // Reset index when changing group
        setCurrentTitle(groups[group][0].title);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : groups[currentGroup].length - 1));
        setCurrentIndex(newIndex);
        setCurrentTitle(groups[currentGroup][newIndex].title); 
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < groups[currentGroup].length - 1 ? prevIndex + 1 : 0));
        setCurrentIndex(newIndex);
        setCurrentTitle(groups[currentGroup][newIndex].title); 
    };

    return (
        <>
            <section className="map">
                <article className="map-slide">
                    <img
                        className='map-image'
                        src={groups[currentGroup][currentIndex]}
                        alt={`Image ${currentIndex + 1}`} />
                </article>
                <h2>{currentTitle}</h2>
                <article className="map-controls">
                    <div className='map-controls-eq'>
                    <div className='map-groups'>
                        <button className="map-groups-group" onClick={() => handleChangeGroup('year')}>Year</button>
                        <button className="map-groups-group" onClick={() => handleChangeGroup('month')}>Month</button>
                        <button className="map-groups-group" onClick={() => handleChangeGroup('week')}>Week</button>
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
