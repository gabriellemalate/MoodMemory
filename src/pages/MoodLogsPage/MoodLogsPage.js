import './MoodLogsPage.scss';

import Logged from '../../components/Logged/Logged';
import LoggedExpand from "../../components/LoggedExpand/LoggedExpand";
import MagnifyingGlass from "../../assets/search.svg"

function MoodLogsPage() {
    return (
        <>
            <main className='all-logs'>
                <div className='all-logs__eq'>

                <form className="all-log__search" action="" method="">
                    <img className="all-log__search-magnifying-glass" src={MagnifyingGlass} alt="Search" />
                    <textarea className="all-log__search-bar" type="search" placeholder="Search" />
                </form>

                <Logged/>
                <LoggedExpand/>
                </div>
            </main>
        </>
    );
}

export default MoodLogsPage;