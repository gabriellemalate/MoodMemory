import './Patterns.scss';

function Patterns() {
    return (
        <>
            <section className='patterns'>
            <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>your typical duration of elevation: <b className='patterns__pattern-number'>

                    </b>
                        days</h5>

                </article>
                <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>your typical duration of depression: <b className='patterns__pattern-number'>

                    </b>
                        days</h5>
                </article>
                <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>events that incite a dip⤵ in mood - keywords from your notes, comments and titles</h5>
                </article>
                <article className='patterns__pattern'>
                    <h5 className='patterns__pattern-head'>events that incite a spike⤴ in mood - keywords from your notes, comments and titles</h5>
                </article>
            </section>
        </>
    )
}

export default Patterns;
