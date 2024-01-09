import './MoodHomePage.scss';

import QuickForm from '../../components/QuickForm/QuickForm';
import ExtendedForm from "../../components/ExtendedForm/ExtendedFrom";
import Faq from "../../components/Faq/Faq"

function Header() {
    return (
        <>
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
                    </article>

                    <section className='add-mood' id="add-mood">

                        <form className='add-mood-include' id="fullmood">
                            <QuickForm/>
                            <ExtendedForm/>
                        </form>

                        <button type="submit" className='add-mood-include__submit' form="fullmood">
                            Apply
                        </button>

                    </section>

                    <Faq/>
                    
                </div>
            </main>
        </>
    );
}

export default Header;