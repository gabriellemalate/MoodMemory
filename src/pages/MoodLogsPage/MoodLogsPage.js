import './MoodLogsPage.scss';

import Logged from '../../components/Logged/Logged';
import LoggedExpand from "../../components/LoggedExpand/LoggedExpand";
import MagnifyingGlass from "../../assets/search.svg"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";

function MoodLogsPage() {
    return (
        <>
        <Header/>
            <main className='all-logs'>
                <div className='all-logs__eq'>
                    <h1 className='all-logs__head'>Your Logged Moods</h1>

                    <form className="all-logs__search" action="" method="">
                        <textarea className="all-logs__search-bar" type="search" placeholder="Search" />
                        <button className="all-logs__search-button">
                        <img className="all-logs__search-button-magnifying-glass" src={MagnifyingGlass} alt="Search" />
                        </button>
                    </form>
                    <section className='all-logs__logs'>
                        <LoggedExpand/>
                        <Logged/>
                        <Logged/>
                        <Logged/>
                    </section>
                </div>
            </main>
            <MobileNav/>
        </>
    );
}

export default MoodLogsPage;