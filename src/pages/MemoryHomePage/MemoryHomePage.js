import './MemoryHomePage.scss';
import Header from '../../components/Header/Header';
import MobileNav from '../../components/MobileNav/MobileNav';

function MemoryHomePage() {
    return (
        <>
            <Header />
            <main className='add-mem'>
                <div className='add-mem__eq'>
                    <h1>Welcome to your Memories</h1>

                    <article className='blob-wrap'>
                        <div className="blobs_1 blobs" />
                        <div className="blobs_2 blobs" />
                        <div className="blobs blobs_3" />
                        <div className="blobs blobs_4" />
                        <div className="blobs blobs_5" />
                        <div className="blobs blobs_6" />
                        <div className="blobs blobs_7" />
                    </article>

                </div>
            </main>
            <MobileNav/>
        </>
    );
}

export default MemoryHomePage;