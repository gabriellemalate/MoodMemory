import './App.scss';
import user from "./assets/user.png";
import poorsleep from "./assets/poor.png";
import okaysleep from "./assets/okay.png";
import goodsleep from "./assets/goodsleep.png";
import awesomesleep from "./assets/awesome.png";
import menu from "./assets/menu.png"
import arrow from "./assets/then.png"
import angry from "./assets/emotes/angry.png";
import annoyed from "./assets/emotes/annoyed.png";
import anxious from "./assets/emotes/anxious.png";
import content from "./assets/emotes/content.png";
import down from "./assets/emotes/down.png";
import energized from "./assets/emotes/energized.png";
import excited from "./assets/emotes/excited.png";
import exhausted from "./assets/emotes/exhausted.png";
import frustrated from "./assets/emotes/frustrated.png";
import grateful from "./assets/emotes/grateful.png";
import happy from "./assets/emotes/happy.png";
import irritable from "./assets/emotes/irritable.png";
import hopeless from "./assets/emotes/hopeless.png";
import loving from "./assets/emotes/loving.png";
import motivated from "./assets/emotes/motivated.png";
import panic from "./assets/emotes/panic.png";
import proud from "./assets/emotes/proud.png";
import relaxed from "./assets/emotes/relaxed.png";
import sad from "./assets/emotes/sad.png";
import satisfied from "./assets/emotes/satisfied.png";
import stressed from "./assets/emotes/stressed.png";
import tired from "./assets/emotes/tired.png";
import unmotivated from "./assets/emotes/unmotivated.png";
import unsure from "./assets/emotes/unsure.png";
import worried from "./assets/emotes/worried.png";

import { BrowserRouter, Routes, Route,} from 'react-router-dom';

function App() {
  return (
    <>
      <header className='header'>

        <input id="moodnav-slider" type="checkbox" role="button" />
        <label id="moodnav" htmlFor="moodnav-slider">
          <img className="header__menu" alt="navigation menu" src={menu} />
        </label>

        <nav className='mood-nav'>
          <div className='mood-nav__eq'>
            <h2 className='mood-nav__head'>mood</h2>

            <ul className='mood-nav__list'>
              <li className='mood-nav__list-logs mood-nav__list-item'>
                <a className='mood-nav__list-logs-link' href="">
                  Mood Logs
                </a>
              </li>
              <li className='mood-nav__list-map mood-nav__list-item'>
                <a className='mood-nav__list-map-link' href="">
                  Mood Maps
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <nav className='home-nav'>
          <div className='home-nav__eq'>
            <div className='home-nav__logo'>
              <a className='home-nav__logo-mood' href="">mood</a>
              <a className='home-nav__logo-memory' href="">memory</a>
            </div>
          </div>
        </nav>

        <input id="usernav-slider" type="checkbox" role="button" />
        <label id="usernav" htmlFor="usernav-slider">
          <img className="user" alt="You" src={user} />
        </label>

        <nav className='user-nav' id="user-nav">
          <div className='user-nav__eq'>
            <div className='user-nav__top'>
              <h2 className='user-nav__top-head'>Hello Gabrielle</h2>

              <ul className='user-nav__top-list'>
                <li className='user-nav__top-list-item-moodtotal user-nav__top-list-item'>
                  42 moods logged
                </li>
                <li className='user-nav__top-list-item-moodstreak user-nav__top-list-item'>12 days in a row
                </li>
                <li className='user-nav__top-list-item-memoryinfo user-nav__top-list-item'>
                  87 memories secured
                </li>
                <li className='user-nav__top-list-item-add'>
                  <a className='user-nav__top-list-item-add--link' href="#add-mood">+ New Log</a>
                </li>
              </ul>
            </div>

            <ul className='user-nav__bottom'>
              <li className='user-nav__bottom-item-faq user-nav__bottom-item'>
                <a className='user-nav__bottom-item-faq-link' href="#faq">FAQ</a></li>
              <li className='user-nav__bottom-item-logout user-nav__bottom-item'>
                <button className='user-nav__bottom-item-logout-button'>
                  log out
                </button>
              </li>
            </ul>

          </div>
        </nav>
      </header>

      <main className='main'>
        <div className='main__eq'>
          <article className='blob-wrap'>
            <div className="blobs_1 blobs" />
            <div className="blobs_2 blobs" />
            <div className="blobs blobs_3" />
            <div className="blobs blobs_4" />
            <div className="blobs blobs_5" />
            <div className="blobs blobs_6" />
            <div className="blobs blobs_7" />
          </article>

          <section className='add-mood' id="add-mood">
            <form className='add-mood-include' id="fullmood">
              <section className='add-mood-quick'>
                <h1 className='add-mood-quick__head'>
                  <span className='add-mood-quick__head-crop'>How are you feeling today, Gabrielle?
                  </span>
                </h1>
                <div className='add-mood-quick-only' id="quickmood">
                  <article className='add-mood-quick__level'>
                    <h3 className='add-mood-quick__level-head'>Mood State</h3>
                    <p className='add-mood-quick__level-subhead'>think of this as your energy level</p>
                    <article className='add-mood-quick__level-state'>
                      <div className='add-mood-quick__level-state-container'>

                        <input className='add-mood-quick__level-state-opt' value="Depressed" id="depressed" name="Depressed" type='radio' />
                        <label className='add-mood-quick__level-state-option' htmlFor="depressed">depressed</label>

                      </div>
                      <div className='add-mood-quick__level-state-container'>
                        <input className='add-mood-quick__level-state-opt' value="wnl" id="wnl" name="wnl" type='radio' title='"Within Normal Limits" No symptoms of depression or elevation' />
                        <label className='add-mood-quick__level-state-option' htmlFor="wnl">wnl</label>
                      </div>

                      <div className='add-mood-quick__level-state-container'>
                        <input className='add-mood-quick__level-state-opt' value="elevated" id="elevated" name="elevated" type='radio' />
                        <label className='add-mood-quick__level-state-option' htmlFor="elevated">elevated</label>
                      </div>
                    </article>

                    <article className='add-mood-quick__level-severity'>
                    <img className='add-mood-quick__level-divider' alt="choose severity level" src={arrow}/>

                    <div className='add-mood-quick__level-severity-all'>
                      <div className='add-mood-quick__level-severity-container'>
                        <input className='add-mood-quick__level-severity-opt' type='radio' value="mild" id="mild" name="mild" />
                        <label className='add-mood-quick__level-severity-option' htmlFor="mild">mild</label>
                      </div>
                      <div className='add-mood-quick__level-severity-container'>
                        <input className='add-mood-quick__level-severity-opt' type='radio' value="moderate" id="moderate" name="moderate" />
                        <label className='add-mood-quick__level-severity-option' htmlFor="moderate">moderate</label>
                      </div>
                      <div className='add-mood-quick__level-severity-container'>
                        <input className='add-mood-quick__level-severity-opt' type='radio' value="severe" id="severe" name="severe" />
                        <label className='add-mood-quick__level-severity-option' htmlFor="severe">severe</label>
                      </div>
                      </div>
                    </article>
                  </article>

                  <article className='add-mood-quick__observations'>
                    <div className='add-mood-quick__observations-all'>
                      <h3 className='add-mood-quick__observations-all-head'>Imbalance Levels</h3>
                      <div className='add-mood-quick__observations-irritability'>
                        <label htmlFor="irritablity" className='add-mood-quick__observations-irritability-head'>irritability</label>
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
                      </div>

                      <div className='add-mood-quick__observations-anxiety'>
                        <label htmlFor="Anxiety" className='add-mood-quick__observations-anxiety-head'>anxiety</label>
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
                      </div>
                    </div>
                  </article>

                  <article className='add-mood-quick__sleep'>
                    <div className='add-mood-quick__sleep-form'>
                    <h3 className='add-mood-quick__sleep-form-head'>Sleep</h3>
                      <div className='add-mood-quick__sleep-form-hours'>
                        <label htmlFor="hours slept" className='add-mood-quick__sleep-form-hours-head'>hours slept</label>
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
                        <label htmlFor="sleep quality" className='add-mood-quick__sleep-form-quality-head'>quality of sleep</label>
                        <div className='add-mood-quick__sleep-form-quality-options'>
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-poor' type="image" src={poorsleep} alt="poor sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-ok' type="image" src={okaysleep} alt="okay sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-good' type="image" src={goodsleep} alt="good sleep" />
                          <input className='add-mood-quick__sleep-form-quality-option add-mood-quick__sleep-form-quality-awesome' type="image" src={awesomesleep} alt="awesome sleep" />
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className='add-mood-quick__notes'>
                    <div className='add-mood-quick__notes-form'>
                      <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--title'>Title</h3>
                      <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-title" type="Text" placeholder="optional" />
                      <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                      <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note" type="Text" placeholder="add notes and symptoms or keep this blank" />
                    </div>
                  </article>

                  <article className='add-mood-quick__emote'>
                    <div className='add-mood-quick__emote-eq'>
                      <h3 className='add-mood-quick__emote-head'>Which best represents how you feel?</h3>
                      <article className='add-mood-quick__emote-menu'>
                        <ul className='add-mood-quick__emote-menu-eq'>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--motivated'>
                            <button type="button" className='add-mood-quick__emote-menu-option--motivated-button add-mood-quick__emote-menu-option--buttonpress'>
                              <div className='add-mood-quick__emote-menu-option--motivated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--motivated-emoji' alt="motivated" src={motivated} />
                                <h4 className='add-mood-quick__emote-menu-option--motivated-title'>motivated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--anxious'>
                            <button className='add-mood-quick__emote-menu-option--anxious-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--anxious-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--anxious-emoji' alt="anxious" src={anxious} />
                                <h4 className='add-mood-quick__emote-menu-option--anxious-title'>anxious</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--relaxed'>
                            <button className='add-mood-quick__emote-menu-option--relaxed-button add-mood-quick__emote-menu-option--buttonpress' type="button">
                              <div className='add-mood-quick__emote-menu-option--relaxed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--relaxed-emoji' alt="relaxed" src={relaxed} />
                                <h4 className='add-mood-quick__emote-menu-option--relaxed-title'>relaxed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--stressed'>
                            <button className='add-mood-quick__emote-menu-option--stressed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--stressed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--stressed-emoji' alt="stressed" src={stressed} />
                                <h4 className='add-mood-quick__emote-menu-option--stressed-title'>stressed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unsure'>
                            <button className='add-mood-quick__emote-menu-option--unsure-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--unsure-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--unsure-emoji' alt="unsure" src={unsure} />
                                <h4 className='add-mood-quick__emote-menu-option--unsure-title'>unsure</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--tired'>
                            <button className='add-mood-quick__emote-menu-option--tired-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--tired-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--tired-emoji' alt="tired" src={tired} />
                                <h4 className='add-mood-quick__emote-menu-option--tired-title'>tired</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--content'>
                            <button className='add-mood-quick__emote-menu-option--content-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--content-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--content-emoji' alt="content" src={content} />
                                <h4 className='add-mood-quick__emote-menu-option--content-title'>content</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--grateful'>
                            <button className='add-mood-quick__emote-menu-option--grateful-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--grateful-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--grateful-emoji' alt="grateful" src={grateful} />
                                <h4 className='add-mood-quick__emote-menu-option--grateful-title'>grateful</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--down'>
                            <button className='add-mood-quick__emote-menu-option--down-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--down-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--down-emoji' alt="down" src={down} />
                                <h4 className='add-mood-quick__emote-menu-option--down-title'>down</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--sad'>
                            <button className='add-mood-quick__emote-menu-option--sad-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--sad-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--sad-emoji' alt="sad" src={sad} />
                                <h4 className='add-mood-quick__emote-menu-option--sad-title'>sad</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--proud'>
                            <button className='add-mood-quick__emote-menu-option--proud-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--proud-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--proud-emoji' alt="proud" src={proud} />
                                <h4 className='add-mood-quick__emote-menu-option--proud-title'>proud</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--unmotivated'>
                            <button className='add-mood-quick__emote-menu-option--unmotivated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--unmotivated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--unmotivated-emoji' alt="unmotivated" src={unmotivated} />
                                <h4 className='add-mood-quick__emote-menu-option--unmotivated-title'>unmotivated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--annoyed'>
                            <button className='add-mood-quick__emote-menu-option--annoyed-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--annoyed-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--annoyed-emoji' alt="annoyed" src={annoyed} />
                                <h4 className='add-mood-quick__emote-menu-option--annoyed-title'>annoyed</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--loving'>
                            <button className='add-mood-quick__emote-menu-option--loving-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--loving-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--loving-emoji' alt="loving" src={loving} />
                                <h4 className='add-mood-quick__emote-menu-option--loving-title'>loving</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--happy'>
                            <button className='add-mood-quick__emote-menu-option--happy-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--happy-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--happy-emoji' alt="happy" src={happy} />
                                <h4 className='add-mood-quick__emote-menu-option--happy-title'>happy</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--worried'>
                            <button className='add-mood-quick__emote-menu-option--worried-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--worried-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--worried-emoji' alt="worried" src={worried} />
                                <h4 className='add-mood-quick__emote-menu-option--worried-title'>worried</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--frustrated'>
                            <button className='add-mood-quick__emote-menu-option--frustrated-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--frustrated-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--frustrated-emoji' alt="frustrated" src={frustrated} />
                                <h4 className='add-mood-quick__emote-menu-option--frustrated-title'>frustrated</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--satisfied'>
                            <button className='add-mood-quick__emote-menu-option--satisfied-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--satisfied-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--satisfied-emoji' alt="satisfied" src={satisfied} />
                                <h4 className='add-mood-quick__emote-menu-option--satisfied-title'>satisfied</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--energized'>
                            <button className='add-mood-quick__emote-menu-option--energized-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--energized-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--energized-emoji' alt="energized" src={energized} />
                                <h4 className='add-mood-quick__emote-menu-option--energized-title'>energized</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--excited'>
                            <button className='add-mood-quick__emote-menu-option--excited-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--excited-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--excited-emoji' alt="excited" src={excited} />
                                <h4 className='add-mood-quick__emote-menu-option--excited-title'>excited</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--angry'>
                            <button className='add-mood-quick__emote-menu-option--angry-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--angry-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--angry-emoji' alt="angry" src={angry} />
                                <h4 className='add-mood-quick__emote-menu-option--angry-title'>angry</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--hopeless'>
                            <button className='add-mood-quick__emote-menu-option--hopeless-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--hopeless-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--hopeless-emoji' alt="hopeless" src={hopeless} />
                                <h4 className='add-mood-quick__emote-menu-option--hopeless-title'>hopeless</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--panicking'>
                            <button className='add-mood-quick__emote-menu-option--panicking-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--panicking-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--panicking-emoji' alt="panicking" src={panic} />
                                <h4 className='add-mood-quick__emote-menu-option--panicking-title'>panicking</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--exhausted'>
                            <button className='add-mood-quick__emote-menu-option--exhausted-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--exhausted-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--exhausted-emoji' alt="exhausted" src={exhausted} />
                                <h4 className='add-mood-quick__emote-menu-option--exhausted-title'>exhausted</h4>
                              </div>
                            </button>
                          </li>
                          <li className='add-mood-quick__emote-menu-option add-mood-quick__emote-menu-option--irritable'>
                            <button className='add-mood-quick__emote-menu-option--irritable-button add-mood-quick__emote-menu-option--buttonpress' type="button" >
                              <div className='add-mood-quick__emote-menu-option--irritable-button-eq'>
                                <img className='add-mood-quick__emote-menu-option--irritable-emoji' alt="irritable" src={irritable} />
                                <h4 className='add-mood-quick__emote-menu-option--irritable-title'>irritable</h4>
                              </div>
                            </button>
                          </li>
                        </ul>
                      </article>
                    </div>
                  </article>
                </div>
                <div className="add-mood-quick-only__buttons">
                <button className="add-mood-quick-only__submit" form="quickmood" type="submit">Quick Log</button>
                <button popovertarget="more-mood" className='add-mood__showmore'>+</button>
                </div>
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
