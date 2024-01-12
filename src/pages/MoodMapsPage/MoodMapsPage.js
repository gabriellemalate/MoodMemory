import './MoodMapsPage.scss';

// import MoodMap from "../../components/MoodMap/MoodMap"
// import MapControls from "../../components/MapControls/MapControls";
import Header from '../../components/Header/Header';

function MoodMapsPage() {
    return (
        <>
        <Header/>
            <main className='maps'>
                <div className='maps__eq'>
                    <h1>Your Maps</h1>

                    <h2>Mood State</h2>

                    <h2>Sleep</h2>

                </div>
            </main>
        </>
    );
}

export default MoodMapsPage;