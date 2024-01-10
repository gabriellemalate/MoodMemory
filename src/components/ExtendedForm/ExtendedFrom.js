import './ExtendedForm.scss';

function ExtendedForm() {
    return (
        <>
        
            <section className="add-mood-more" id="more-mood">
                <ul className='add-mood-more__list'>
                    <li className='add-mood-more__medapp'>
                        <div className='add-mood-more__medapp-eq'>
                            <article className='add-mood-more__medapp-choice'>
                                <div className='add-mood-more__medapp-choice-eq'>
                                    <h3 className='add-mood-more__medapp-choice-head'>Medication & Appointments</h3>
                                    <input type="checkbox" className='add-mood-more__medapp-choice-tick' />
                                </div>
                            </article>
                            <div className='add-mood-more__medapp-extend'>
                                <div className='add-mood-more__medapp-extend-all'>

                                    <article className='add-mood-more__medapp-meds'>
                                        <div className='add-mood-more__medapp-meds-eq'>
                                            <h4 className='add-mood-more__medapp-meds-head'>Medications</h4>
                                            <input type="checkbox" className='add-mood-more__medapp-meds-tick' />
                                        </div>
                                    </article>

                                    <article className='add-mood-more__medapp-medextend'>
                                        <div className='add-mood-more__medapp-medextend-eq'>
                                            <article className='add-mood-more__medapp-medextend-queries'>
                                                <div className='add-mood-more__medapp-medextend-queries-eq'>
                                                    <div className='add-mood-more__medapp-medextended-queries-left'>
                                                        <textarea className='add-mood-more__medapp-medextend-medname' type="text" placeholder='medicine name' />
                                                        <input type='number' className='add-mood-more__medapp-medextend-queries-dosage' placeholder='dosage' />
                                                        <select className='add-mood-more__medapp-medextend-queries-units'>
                                                            <option className='add-mood-more__medapp-medextend-queries-unit'>mg</option>
                                                            <option className='add-mood-more__medapp-medextend-queries-unit'>ml</option>
                                                            <option className='add-mood-more__medapp-medextend-queries-unit'>mcg</option>
                                                            <option className='add-mood-more__medapp-medextend-queries-unit'>N/A</option>
                                                        </select>
                                                    </div>
                                                    <div className='add-mood-more__medapp-medextend-queries-right'>
                                                        <button type="button" title="applied" className='add-mood-more__medapp-medextend-queries-take'>took it</button>
                                                        <button title="missed" type="button" className='add-mood-more__medapp-medextend-queries-miss'>missed it</button>
                                                    </div>
                                                </div>
                                                <button className='add-mood-more__medapp-medextend-print' type='submit' formTarget="meds">add</button>
                                            </article>
                                        </div>
                                    </article>

                                    <article className='add-mood-more__medapp-appts'>
                                        <div className='add-mood-more__medapp-appts-eq'>
                                            <h4 className='add-mood-more__medapp-appts-head'>Appointments</h4>
                                            <input type="checkbox" className='add-mood-more__medapp-appts-tick' />
                                        </div>
                                    </article>

                                    <article className='add-mood-more__medapp-appextend'>
                                        <div className='add-mood-more__medapp-appextend-eq'>
                                            <article className='add-mood-more__medapp-appextend-queries'>
                                                <div className='add-mood-more__medapp-appextend-queries-eq'>
                                                    <div className='add-mood-more__medapp-appextended-queries-left'>
                                                        <textarea className='add-mood-more__medapp-appextend-type' type="text" placeholder='Appointment Type' />
                                                        <textarea className='add-mood-more__medapp-appextend-doc' type="text" placeholder="Doctor's Name" />
                                                    </div>
                                                    <div className='add-mood-more__medapp-appextended-queries-right'>
                                                        <button title="participated" type="button" className='add-mood-more__medapp-appextend-queries-attend'>attended</button>
                                                        <button title="missed" type="button" className='add-mood-more__medapp-appextend-queries-miss'>missed</button>
                                                    </div>
                                                </div>
                                                <button className='add-mood-more__medapp-appextend-print' formTarget="appts">add</button>
                                            </article>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className='add-mood-more__menses'>
                        <div className='add-mood-more__menses-eq'>
                            <article className='add-mood-more__menses-choice'>
                                <div className='add-mood-more__menses-choice-eq'>
                                    <h3 className='add-mood-more__menses-choice-head'>Menstruation or "Menses"</h3>
                                    <input type="checkbox" className='add-mood-more__menses-choice-tick' />
                                </div>
                            </article>

                            <div className='add-mood-more__menses-extend'>
                                <div className='add-mood-more__menses-extend-all'>
                                    <div className='add-mood-more__menses-query add-mood-more__menses-day'>
                                        <input type='number' max="9" placeholder='Day #' />
                                    </div>
                                    <div className='add-mood-more__menses-query add-mood-more__menses-flow'>
                                        <input type='number' max="5" placeholder='Flow Level 1-5' />
                                    </div>
                                    <div className='add-mood-more__menses-query add-mood-more__menses-pain'>
                                        <input type='number' min="0" max="3" placeholder='Pain Level 0-3' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className='add-mood-more__symp'>
                        <div className='add-mood-more__symp-eq'>
                            <article className='add-mood-more__symp-choice'>
                                <div className='add-mood-more__symp-choice-eq'>
                                    <h3 className='add-mood-more__symp-choice-head'>Suggested Symptoms</h3>
                                    <input type="checkbox" className='add-mood-more__symp-choice-tick' />
                                </div>
                            </article>

                            <article className='add-mood-more__symp-extend'>
                                <div className='add-mood-more__symp-extend-all'>
                                    <h4 className='add-mood-more__symp-extend-head'>choose as many that are applicable</h4>
                                    <div className='add-mood-more__symp-extend-wrapper' id="symptoms">
                                        <button className='add-mood-more__symp-extend-option' type="button">isolation</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">panic attacks</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">constant sadness</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">mood swings</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">self harm</button>

                                        <button className='add-mood-more__symp-extend-option' type="button">overspending</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">winding rumination</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">very low sex drive</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">notably increased sex drive</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">excessive emotions</button>

                                        <button className='add-mood-more__symp-extend-option' type="button">low appetite</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">high appettite</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">procrastination</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">easily distracted</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">anxious thoughts</button>

                                        <button className='add-mood-more__symp-extend-option' type="button">nervous teeth grinding</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">talking faster than usual</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">nail biting</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">spent all day in bed</button>
                                        <button className='add-mood-more__symp-extend-option' type="button">dissociation</button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    );
}

export default ExtendedForm;