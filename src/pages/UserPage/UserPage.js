import React from "react";
import "./UserPage.scss"
import Header from '../../components/Header/Header';
import MobileNav from "../../components/MobileNav/MobileNav";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function UserPage() {
    const [user] = useAuthState(auth);

    return (
        <>
            <Header />
            <main className="userpage">
                <p className="userpage__head">Hello,
                    <span className='user-nav__top-head-name'>
                        {user ? user.displayName : ''}
                    </span>
                </p>

                <section className='userpage__faq'>
                    <div className='userpage__faq-eq'>
                        <h2 className='userpage__faq-head'>FAQ</h2>
                        <div className='userpage__faq-questions'>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What is WNL?</h4>
                                <p className='userpage__faq-query__answer'>{'"within normal limits" no symptoms of depression or elevation. '} <a className='userpage__faq-query__answer-link' href='https://agilevirtualpt.com/blog/why-you-want-to-hear-virtual-physical-therapists-use-the-medical-abbreviation-wnl-in-your-sessions/'>More info here</a></p>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>Why are my mood state options "Depressed", "WNL", and "Elevated"?</h4> <p className='userpage__faq-query__answer'>Medical professionals uniformly use, and recommend these terms for mood tracking. These choices aim to remove the societal connotations of what "Depression" is, which is widely-variedly perceived. Instead, this application's environment aims to cultivate safety in unhesitantly opting for what rings true. These terms were thoughtfully chosen to adjust your current space into an honest and kind space, no matter where you are at the time of logging. <a className='userpage__faq-query__answer-link' href="https://www.guilford.com/books/The-Bipolar-Disorder-Survival-Guide/David-Miklowitz/9781462534982"> More info here. </a></p>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What symptoms of mood disruption are there to look out for and log?</h4>
                                <div className='userpage__faq-query__answer'>There are a handful of mood state nuances such as hypo states and mixed states. Here are some symptom example of 3 of those mood states for your perusing in this site with recommendation to do further research on each nuance.
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Mania~ spending credit you can't pay, shopping in one day especially while important bills are unpaid.  major increase in sexual activity especially if with multiple strangers. Feeling invincible to pain and risk. <a href="https://my.clevelandclinic.org/health/diseases/21603-mania" className='userpage__faq-query__answer-link'>More about Elevation.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Mixed States~ unprofessional at work. Craving instability which can be manifested for example in a sudden disinterest in a long term partner. <a href="https://www.webmd.com/bipolar-disorder/mixed-bipolar-disorder" className='userpage__faq-query__answer-link'>More about Mixed States.</a></p>
                                    <p className='userpage__faq-query__answer-bulletpoint'>Generalized Depression~ not showering for a long time. eating to calm your nerves. sleeping most of the day. <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder#:~:text=Bipolar%20disorder%20(formerly%20called%20manic,day%2Dto%2Dday%20tasks." className='userpage__faq-query__answer-link'>More about Depression.</a></p>
                                </div>
                            </article>
                            <article className='userpage__faq-query'>
                                <h4 className='userpage__faq-query__head'>What kind of "Significant or Impactful Events" could be affecting my mood?</h4>
                                <p className='userpage__faq-query__answer'>Each list of external factors / casues/ triggers / environments that cause mood disrution vary from person to person. Just some examples of logs about impactful events include: <i>"argument with father" "concert. stayed out til 3am" "dog got sick" "pet back from hospital" "partner is rejecting my bids" "friend's wedding" </i> <a className='userpage__faq-query__answer-link' href="https://www.betterhealth.vic.gov.au/health/healthyliving/monitoring-your-mood">More about External events.</a> <a className='userpage__faq-query__answer-link' href="https://www.nami.org/Blogs/NAMI-Blog/January-2022/Understanding-Mental-Illness-Triggers">More about Triggers. </a>
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>
            <MobileNav />
        </>
    );
}

export default UserPage;