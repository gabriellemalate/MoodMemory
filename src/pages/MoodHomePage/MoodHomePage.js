import './MoodHomePage.scss';
import React, { useEffect, useRef, useState } from "react";

import QuickForm from '../../components/QuickForm/QuickForm';
import Faq from "../../components/Faq/Faq"
import Header from '../../components/Header/Header';
import MobileNav from '../../components/MobileNav/MobileNav';
import Footer from '../../components/Footer/Footer';

function MoodHomePage() {
    const [scrollToFAQ, setScrollToFAQ] = useState(false);
    const faqRef = useRef(null);

    useEffect(() => {
        // scroll to the FAQ section when the component mounts
        if (scrollToFAQ && faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: "smooth" });
            setScrollToFAQ(false);
        }
    }, [scrollToFAQ]);

    return (
        <>
            <Header setScrollToFAQ={setScrollToFAQ} currentPage="moodhome" />
            <main className='main'>
                <div className='main__eq'>

                    <article className='blob-wrap'>
                        <div className="blobs_1 blobs" />
                        <div className="blobs_2 blobs" />
                        <div className="blobs blobs_3" />
                        <div className="blobs blobs_4" />
                        <div className="blobs blobs_5" />
                        <div className="blobs blobs_6" />
                        <div className="blobs blobs_7" />
                        <div className="blobs blobs_8" />
                        <div className="blobs blobs_9" />
                        <div className="blobs blobs_10" />
                        <div className="blobs blobs_11" />
                        <div className="blobs blobs_12" />
                        <div className="blobs blobs_13" />
                        <div className="blobs blobs_14" />
                    </article>

                    <section className='add-mood' id="add-mood">

                        <div className='add-mood-include'>
                            <QuickForm />
                        </div>

                    </section>
                        <Faq ref={faqRef} />

                </div>
                <Footer/>
            </main>
            <MobileNav />
        </>
    );
}

export default MoodHomePage;