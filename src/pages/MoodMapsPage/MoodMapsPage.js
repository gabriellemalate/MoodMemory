import './MoodMapsPage.scss';
import React, { useState, useEffect } from 'react';
import MoodMap from "../../components/MoodMap/MoodMap"
import Header from '../../components/Header/Header';


const MoodMapsPage = () => {

    return (
        <>
            <Header />
            <main className='maps'>
                <div className='maps__eq'>
                    <h1 className='maps__head'>Your Maps</h1>

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>Mood State</h2>
                        <MoodMap />
                    </section>
                    <section className='maps__sleep'>
                    <h2 className='maps__sleep-head'>Sleep</h2>

                    </section>

                </div>
            </main>
        </>
    );
}

export default MoodMapsPage;