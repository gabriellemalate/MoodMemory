import './MoodLogsPage.scss';

import Logged from '../../components/Logged/Logged';
// import LoggedExpand from "../../components/LoggedExpand/LoggedExpand";
import MagnifyingGlass from "../../assets/search.svg"

function MoodLogsPage() {
    return (
        <>
            <main className='all-logs'>
                <div className='all-logs__eq'>
                    <h1 className='all-logs__head'>Your Logged Moods</h1>

                    <form className="all-logs__search" action="" method="">
                        <img className="all-logs__search-magnifying-glass" src={MagnifyingGlass} alt="Search" />
                        <textarea className="all-logs__search-bar" type="search" placeholder="Search" />
                    </form>
                    <section className='all-logs__logs'>
                        <Logged/>
                        {/* <LoggedExpand/> */}
                    </section>
                </div>
            </main>
        </>
    );
}

export default MoodLogsPage;