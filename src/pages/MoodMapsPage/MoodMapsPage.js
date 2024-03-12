import './MoodMapsPage.scss';
import React, { useState, useEffect } from 'react';
import MoodMap from "../../components/MoodMap/MoodMap"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import Footer from "../../components/Footer/Footer";
import SleepMap from '../../components/SleepMap/SleepMap';

const MoodMapsPage = () => {

    return (
        <>
            <Header />
            <main className='maps'>
                <div className='maps__eq'>
                    <h1 className='maps__head'>your maps</h1>

                    <article className='blob-wrap'>
                        <div className="blobs blobs_map-1" />
                        <div className="blobs blobs_map-2" />
                        <div className="blobs blobs_map-3" />

                    </article>

                    <section className='maps__mood'>
                        <h2 className='maps__mood-head'>mood</h2>
                        <MoodMap />
                    </section>
                    <section className='maps__sleep'>
                        <h2 className='maps__sleep-head'>sleep</h2>
                        {/* <SleepMap /> */}
                    </section>

                </div>
                <Footer />
            </main>
            <MobileNav />
        </>
    );
}

export default MoodMapsPage;