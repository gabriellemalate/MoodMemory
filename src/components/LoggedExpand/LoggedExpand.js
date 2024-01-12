import './LoggedExpand.scss';
import emote from "../../assets/emotes/irritable.png"
import okaysleep from "../../assets/okay.png";

function LoggedExpand() {
    return (
        <>
            <article className='open'>
                <div className='open-eq'>
                    <div className='open-top'>
                        <div className='open-top-left'>
                            <div className='open-top-left__frame'>
                                <img className='open-top-left__frame-emoji' alt='open emotion' src={emote} />
                                <h2 className='open-top-left__frame-emotion'>emotion</h2>
                            </div>

                            <h3 className='open-top-left__title'>title</h3>
                        </div>
                        <div className='open-top-right'>
                            <h3 className='open-top-right__date'>date</h3>
                            <h3 className='open-top-right__time'>time</h3>
                        </div>
                    </div>
                    <div className='open-bottom'>
                        <div className='open-bottom-left'>
                            <h2 className='open-bottom-left__state'>Low Mild</h2>
                            <div className='open-bottom-left__obs'>
                                <span className='open-bottom-left__obs-irr'>Irr: </span >
                                <span className='open-bottom-left__obs-anx'>Anx: </span >
                            </div>
                        </div>
                        <div className='open-bottom-right'>
                            <p className='open-bottom-right__hours'>5 hours</p>
                            <img className='open-bottom-right__quality' src={okaysleep} alt="sleep quality" title="sleep quality" />
                        </div>
                    </div>
                    <p className='open-bottom__notes'>
                        user notes go here
                    </p>
                    <form className='open-add'>
                        <label className="open-add__label">New Message:</label>
                        <input type="text" id="messageInput" name="messageInput" placeholder="Enter a message" className="open-add__input" />
                        <button className='open-add__button'>add</button>
                    </form>
                    <button className='open__close'>
                        close
                    </button>
                </div>
            </article>
        </>
    );
}

export default LoggedExpand;