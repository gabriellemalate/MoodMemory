import './MoodHomePage.scss';
import React, { useEffect, useRef } from "react";

import QuickForm from '../../components/QuickForm/QuickForm';
import Faq from "../../components/Faq/Faq"
import Header from '../../components/Header/Header';

function MoodHomePage() {
    const faqRef = useRef(null);

    useEffect(() => {
        // scroll to the FAQ section when the component mounts
        if (faqRef.current) {
            faqRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);
    return (
        <>
            <Header/>
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
                    </article>

                    <section className='add-mood' id="add-mood">

                        <form className='add-mood-include' id="fullmood">
                            <QuickForm/>
                        </form>

                    </section>

                    <Faq ref={faqRef}/>
                    
                </div>
            </main>
        </>
    );
}

export default MoodHomePage;