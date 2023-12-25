import './App.css';
import user from "./assets/user.png";
import poorsleep from "./assets/poorsleep.png";
import okaysleep from "./assets/okay sleep.png";
import goodsleep from "./assets/good sleep.png";
import awesomesleep from "./assets/awesomesleep.png";
import emoji from "./assets/satisfied.png"

function App() {
  return (
    <>
      <header className='header'>
        <nav className='mood-nav'>
          <div className='mood-nav__eq'>
            <a onClick="closeNav()" href="javascript:void(0)" className="mood-nav__close">&times;</a>
            <h2 className='mood-nav__head'>Mood</h2>

            <ul className='mood-nav__list'>
              <li className='mood-nav__list-logs'>
                <a className='mood-nav__list-logs-link' href="">
                  Mood Logs
                </a>
              </li>
              <li className='mood-nav__list-map'>
                <a className='mood-nav__list-map-link' href="">
                  Mood Map
                </a>
              </li>
            </ul>

          </div>
        </nav>

        <nav className='home-nav'>
          <div className='home-nav__eq'>
            <ul className='home-nav__left'>
              <li onClick="openNav()" className='home-nav__left--open'>hover icon for mood nav</li>
              <li className='home-nav__left-logo'>
                <a className='home-nav__left-logo-mood' href="">Mood</a>
                <a className='home-nav__left-logo-memory' href="">Memory</a>
              </li>
            </ul>

            <ul className='home-nav__right'>
              <li className='home-nav__right-user'>
                <a className='home-nav__right-user-link' href="">
                  <img className="home-nav__right-user-image" alt="You" src={user} />
                </a>
              </li>
            </ul>

          </div>
        </nav>

        <nav className='user-nav'>
          <div className='user-nav__eq'>
            <article className='user-nav__all'>
              <div className='user-nav__top'>
                <h2 className='user-nav__top-head'>Hello "name interpolated"</h2>

                <ul className='user-nav__top-list'>
                  <li className='user-nav__top-list-item-moodinfo user-nav__top-list-item'>
                    <div className='user-nav__top-list-item-moodinfo--eq'>
                      <p className='user-nav__top-list-item-moodinfo-total'>Total Moods Logged: "total interpolated"</p>
                      <p className='user-nav__top-list-item-moodinfo-streak'>Consistent Mood Logging: "streak interpolated" Days</p>
                    </div>
                  </li>
                  <li className='user-nav__top-list-item-memoryinfo user-nav__top-list-item'>
                    Total Memories Secured: "total interpolated"
                  </li>
                  <li className='user-nav__top-list-item-add user-nav__top-list-item'>
                    <a className='user-nav__top-list-item-add--link' href="">+</a>
                  </li>
                </ul>
              </div>
            </article>

            <ul className='user-nav__bottom'>
              <li className='user-nav__bottom-item-faq user-nav__bottom-item'>
                <a className='user-nav__bottom-item-faq-link' href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
            <li className='user-nav__bottom-item-logout user-nav__bottom-item'>
              <button className='user-nav__bottom-item-logout-button'>
                log out
              </button>
            </li>
          </div>
        </nav>
      </header>

      <main className='main'>
        <div className='main__eq'>

          <section className='add-mood'>
            {/* includes extended queries with quick add form */}
            <form className='add-mood-include' id="fullmood">
              <section className='add-mood-quick'>
                <h1 className='add-mood-quick__head'>How are you feeling today, "Name Interpolated"?</h1>
                <form className='add-mood-quick-only' id="quickmood">
                  <article className='add-mood-quick__level'>
                    <div className='add-mood-quick__level-head'>
                      <h3 className='add-mood-quick__level-head'>Mood State</h3>
                      <p>think of this as your energy level</p>
                    </div>
                    <div className='add-mood-quick__level-state'>
                      <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--dep' formtarget="user-moodstate" value="Depressed" name="Depressed" popovertarget="state-severity" popovertargetaction="show" type='submit'>Low/Depressed</button>
                      <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--wnl' type='submit' formtarget="user-moodstate" title='"Within Normal Limits" No symptoms of depression or elevation' popovertarget="state-severity" popovertargetaction="hide">WNL</button>
                      <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--elev' popovertarget="state-severity" formtarget="user-moodstate" popovertargetaction="show" type='submit'>Elevated/Manic</button>
                    </div>
                    <span className='add-mood-quick__level-divider'>{": "}</span>
                    <form className='add-mood-quick__level-severity' id="state-severity">
                      <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--mild' type='submit' formtarget="user-moodstate">Mild</button>
                      <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--mod' type='submit' formtarget="user-moodstate">Moderate</button>
                      <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--sev' type='submit' formtarget="user-moodstate">Severe</button>
                    </form>
                    <iframe name="user-moodstate">
                      Your mood state:
                    </iframe>
                  </article>

                  <article className='add-mood-quick__observations'>
                    <div className='add-mood-quick__observations-all'>
                      <h3>Self Check in</h3>
                      <form className='add-mood-quick__observations-irritability'>
                        <label htmlFor="irritablity" className='add-mood-quick__observations-irritability-head'>Irritability</label>
                        <select className='add-mood-quick__observations-irritability-menu'>
                          <optgroup className='add-mood-quick__observations-irritability-menugroup' label="irritability level">
                            <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--none'>
                              0 None
                            </option>
                            <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--mild'>
                              1 Mild
                            </option>
                            <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--mod'>
                              2 Moderate
                            </option>
                            <option className='add-mood-quick__observations-irritability-menugroup-option add-mood-quick__observations-irritability-menugroup-option--sev'>
                              3 Severe
                            </option>
                          </optgroup>
                        </select>
                      </form>

                      <form className='add-mood-quick__observations-anxiety'>
                        <label htmlFor="Anxiety" className='add-mood-quick__observations-anxiety-head'>Anxiety</label>
                        <select className='add-mood-quick__observations-anxiety-menu'>
                          <optgroup className='add-mood-quick__observations-anxiety-menugroup' label="anxiety level">
                            <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--none'>
                              0 None
                            </option>
                            <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--mild'>
                              1 Mild
                            </option>
                            <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--mod'>
                              2 Moderate
                            </option>
                            <option className='add-mood-quick__observations-anxiety-menugroup-option add-mood-quick__observations-anxiety-menugroup-option--sev'>
                              3 Severe
                            </option>
                          </optgroup>
                        </select>
                      </form>
                    </div>
                  </article>

                  <article className='add-mood-quick__sleep'>
                    <form className='add-mood-quick__sleep-form'>
                      <div className='add-mood-quick__sleep-form-hours'>
                        <label htmlFor="hours slept" className='add-mood-quick__sleep-form-hours-head'>Hours Slept</label>
                        <select className='add-mood-quick__sleep-form-hours-menu'>
                          <optgroup className='add-mood-quick__sleep-form-menugroup' label="number of hours">
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--zero'>
                              I did not sleep
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--less'>
                              I slept for less than 1 hour
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--one'>
                              1 hour
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--two'>
                              2 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--three'>
                              3 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--four'>
                              4 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--five'>
                              5 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--six'>
                              6 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--seven'>
                              7 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--eight'>
                              8 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--more'>
                              9-10 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--halfday'>
                              11-12 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--abovehalf'>
                              13-15 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--much'>
                              16-19 hours
                            </option>
                            <option className='add-mood-quick__sleep-form-menugroup-option add-mood-quick__sleep-form-menugroup-option--most'>
                              I slept for 20 hours or more
                            </option>
                          </optgroup>
                        </select>
                      </div>
                      <div className='add-mood-quick__sleep-form-quality'>
                        <label htmlFor="sleep quality" className='add-mood-quick__sleep-form-quality-head'>The Quality of your Sleep</label>
                        <div className='add-mood-quick__sleep-form-quality-options'>
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-poor' type="image" src={poorsleep} alt="poor sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-ok' type="image" src={okaysleep} alt="okay sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-good' type="image" src={goodsleep} alt="good sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-awesome' type="image" src={awesomesleep} alt="awesome sleep" />
                        </div>
                      </div>
                    </form>
                  </article>

                  <article className='add-mood-quick__notes'>
                    <form className='add-mood-quick__notes-form'>
                      <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--title'>Title</h3>
                      <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-title" type="Text" placeholder="optional" />
                      <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                      <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note" type="Text" placeholder="Add notes and symptoms or keep this blank" />
                    </form>
                  </article>

                  <article className='add-mood-quick__emote'>
                    <form className='add-mood-quick__emote-eq'>
                      <h3 className='add-mood-quick__emote-head'>Which best represents how you feel?</h3>
                      <article className='add-mood-quick__emote-menu'>
                        <ul className='add-mood-quick__emote-menu-eq'>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--motivated'>
                            <button type="button" className='add-mood-quick__emote-menu-option--motivated-button add-mood-quick__emote-menu-option--buttonpress'>
                              <div className='add-mood-quick__emote-menu-option--motivated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--motivated-emoji' alt="motivated" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--motivated-title'>motivated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--anxious'>
                            <button className='add-mood-quick__emote-menu-option--anxious-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--anxious-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--anxious-emoji' alt="anxious" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--anxious-title'>anxious</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--relaxed'>
                            <button className='add-mood-quick__emote-menu-option--relaxed-button add-mood-quick__emote-menu-option--buttonpress' type="button">
                              <div className='add-mood-quick__emote-menu-option--relaxed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--relaxed-emoji' alt="relaxed" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--relaxed-title'>relaxed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--stressed'>
                            <button className='add-mood-quick__emote-menu-option--stressed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--stressed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--stressed-emoji' alt="stressed" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--stressed-title'>stressed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unsure'>
                            <button className='add-mood-quick__emote-menu-option--unsure-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--unsure-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--unsure-emoji' alt="unsure" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--unsure-title'>unsure</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--tired'>
                            <button className='add-mood-quick__emote-menu-option--tired-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--tired-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--tired-emoji' alt="tired" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--tired-title'>tired</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--content'>
                            <button className='add-mood-quick__emote-menu-option--content-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--content-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--content-emoji' alt="content" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--content-title'>content</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--grateful'>
                            <button className='add-mood-quick__emote-menu-option--grateful-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--grateful-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--grateful-emoji' alt="grateful" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--grateful-title'>grateful</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--down'>
                            <button className='add-mood-quick__emote-menu-option--down-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--down-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--down-emoji' alt="down" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--down-title'>down</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--sad'>
                            <button className='add-mood-quick__emote-menu-option--sad-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--sad-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--sad-emoji' alt="sad" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--sad-title'>sad</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--proud'>
                            <button className='add-mood-quick__emote-menu-option--proud-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--proud-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--proud-emoji' alt="proud" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--proud-title'>proud</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unmotivated'>
                            <button className='add-mood-quick__emote-menu-option--unmotivated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--unmotivated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--unmotivated-emoji' alt="unmotivated" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--unmotivated-title'>unmotivated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--annoyed'>
                            <button className='add-mood-quick__emote-menu-option--annoyed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--annoyed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--annoyed-emoji' alt="annoyed" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--annoyed-title'>annoyed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--loving'>
                            <button className='add-mood-quick__emote-menu-option--loving-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--loving-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--loving-emoji' alt="loving" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--loving-title'>loving</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--happy'>
                            <button className='add-mood-quick__emote-menu-option--happy-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--happy-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--happy-emoji' alt="happy" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--happy-title'>happy</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--worried'>
                            <button className='add-mood-quick__emote-menu-option--worried-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--worried-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--worried-emoji' alt="worried" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--worried-title'>worried</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--frustrated'>
                            <button className='add-mood-quick__emote-menu-option--frustrated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--frustrated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--frustrated-emoji' alt="frustrated" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--frustrated-title'>frustrated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--satisfied'>
                            <button className='add-mood-quick__emote-menu-option--satisfied-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--satisfied-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--satisfied-emoji' alt="satisfied" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--satisfied-title'>satisfied</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--energized'>
                            <button className='add-mood-quick__emote-menu-option--energized-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--energized-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--energized-emoji' alt="energized" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--energized-title'>energized</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--excited'>
                            <button className='add-mood-quick__emote-menu-option--excited-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--excited-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--excited-emoji' alt="excited" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--excited-title'>excited</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--angry'>
                            <button className='add-mood-quick__emote-menu-option--angry-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--angry-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--angry-emoji' alt="angry" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--angry-title'>angry</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--hopeless'>
                            <button className='add-mood-quick__emote-menu-option--hopeless-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--hopeless-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--hopeless-emoji' alt="hopeless" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--hopeless-title'>hopeless</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--panicking'>
                            <button className='add-mood-quick__emote-menu-option--panicking-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--panicking-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--panicking-emoji' alt="panicking" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--panicking-title'>panicking</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--exhausted'>
                            <button className='add-mood-quick__emote-menu-option--exhausted-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--exhausted-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--exhausted-emoji' alt="exhausted" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--exhausted-title'>exhausted</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--irritable'>
                            <button className='add-mood-quick__emote-menu-option--irritable-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--irritable-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--irritable-emoji' alt="irritable" src={emoji} />
                                <h4 className='add-mood-quick__emote-menu-option--irritable-title'>irritable</h4>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </article>
                    </form>
                  </article>
                </form>
                <button className="add-mood-quick-only__submit" form="quickmood" type="submit">Quick Log</button>
                <button popovertarget="more-mood" popovertargetaction="show" className='add-mood__showmore'>show more +</button>
              </section>
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
                              <form className='add-mood-more__medapp-medextend-queries'>
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
                                <button className='add-mood-more__medapp-medextend-print' type='submit' formtarget="meds">add</button>
                              </form>
                              <iframe className='add-mood-more__medapp-medextend-printhere' name="meds">
                                added medications in this area
                              </iframe>
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
                              <form className='add-mood-more__medapp-appextend-queries'>
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
                                <button className='add-mood-more__medapp-appextend-print' formtarget="appts">add</button>
                              </form>
                              <iframe className='add-mood-more__medapp-appextend-printhere' name='appts'>
                                added appointments in this area
                              </iframe>
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
                          <div className='add-mood-more__symp-extend-wrapper'>
                            <button></button>
                          </div>
                        </div>
                      </article>
                    </div>
                  </li>
                </ul>
              </section>
            </form>
            <button type="submit" className='add-mood-include__submit' form="fullmood">Apply</button>
          </section>
        </div>
      </main>

      <section className='faq'>
        <div className='faq-eq'>
          <h2 className='faq-head'>FAQ</h2>
          <div className='faq-questions'>
            <article className='faq-query'>
              <h4 className='faq-query__head'>What is WNL?</h4><span className='faq-query__answer'>{'"within normal limits" no symptoms of depression or elevation. '}</span><a className='faq-query__link' href='https://agilevirtualpt.com/blog/why-you-want-to-hear-virtual-physical-therapists-use-the-medical-abbreviation-wnl-in-your-sessions/'>More info here</a>
            </article>
            <article className='faq-query'>
              <h4 className='faq-query__head'>What are symptoms of mood disruption to look out for and log?</h4>
              <div className='faq-query__answer'>Some example symptoms of each include:
                <p className='faq-query__answer-bulletpoint'>a. elevation: spending $6000 shopping in one day especially while important bills are unpaid.  major increase in sexual activity especially if with multiple strangers. Feeling invincible to pain and risk. <a href="https://my.clevelandclinic.org/health/diseases/21603-mania" className='faq-query__answer-link'>More about Elevation.</a></p>
                <p className='faq-query__answer-bulletpoint'>b. mixed states: unprofessional at work. <a href="https://www.webmd.com/bipolar-disorder/mixed-bipolar-disorder" className='faq-query__answer-link'>More about Mixed States.</a></p>
                <p className='faq-query__answer-bulletpoint'>c. depression: not showering for a long time. eating to calm your nerves. sleeping most of the day. <a href="https://www.nimh.nih.gov/health/topics/bipolar-disorder#:~:text=Bipolar%20disorder%20(formerly%20called%20manic,day%2Dto%2Dday%20tasks." className='faq-query__answer-link'>More about Depression.</a></p>
              </div>
            </article>
            <article className='faq-query'>
              <h4 className='faq-query__head'>What kind of "Significant or Impactful Events" could be affecting my mood?</h4> <p className='faq-query__answer'>Each list of external factors / casues/ triggers / environments that cause mood disrution vary from person to person. Just some examples of logs about impactful events include: <i>"argument with father" "concert. stayed out til 3am" "dog got sick" "pet back from hospital" "partner is rejecting my bids" "friend's wedding" </i> <a className='faq-query__answer-link' href="https://www.betterhealth.vic.gov.au/health/healthyliving/monitoring-your-mood">More about External events.</a> <a className='faq-query__answer-link' href="https://www.nami.org/Blogs/NAMI-Blog/January-2022/Understanding-Mental-Illness-Triggers">More about Triggers. </a></p>
            </article>
            <article className='faq-query'>
              <h4 className='faq-query__head'>How do I gauge "mild" "moderate" and "severe"?</h4> <p className='faq-query__answer'>Paragraph <a className='faq-query__answer-link' href="https://www.google.com"> link </a></p>
            </article>
            <article className='faq-query'>
              <h4 className='faq-query__head'>Mood State Terms:</h4> <p className='faq-query__answer'>The choice of the term "low" with "depressed" aims to remove the societal connotations of what "Depression" is, which is widely-variedly perceived. Instead creating safety in opting for genuine logs of lower energy as well as "elevated" or high energy. These terms were thoughtfully chosen together to adjust your current environment into a kind and honest space no matter where you are. <a className='faq-query__answer-link' href="https://www.google.com"> link </a></p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
