import './App.css';
import user from "./assets/user.png";
import poorsleep from "./assets/poorsleep.png";
import okaysleep from "./assets/okay sleep.png";
import goodsleep from "./assets/good sleep.png";
import awesomesleep from "./assets/awesomesleep.png";

function App() {
  return (
    <>
      <header className='header'>
        <nav className='mood-nav'>
          <div className='mood-nav__eq'>
            <a onclick="closeNav()" href="javascript:void(0)" className="mood-nav__close">&times;</a>
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
              <li onclick="openNav()" className='home-nav__left--open'>hover icon for mood nav</li>
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
            <section className='add-mood-quick'>
              <h1 className='add-mood-quick__head'>How are you feeling today, "Name Interpolated"?</h1>
              <article className='add-mood-quick__level'>
                <div className='add-mood-quick__level-head'>
                  <h3 className='add-mood-quick__level-head'>Mood State</h3>
                  <p>think of this as your energy level</p>
                </div>
                <div className='add-mood-quick__level-state'>
                  <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--dep'>Low/Depressed</button>
                  <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--wnl' title="Within Normal Limits" No symptoms of depression or elevation>WNL</button>
                  <button className='add-mood-quick__level-state-option add-mood-quick__level-state-option--elev'>Elevated/Manic</button>
                </div>
                <span className='add-mood-quick__level-divider'>{": "}</span>
                <div className='add-mood-quick__level-severity'>
                  <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--mild'>Mild</button>
                  <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--mod'>Moderate</button>
                  <button className='add-mood-quick__level-severity-option add-mood-quick__level-severity-option--sev'>Severe</button>
                </div>
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
                    <label htmlFor="sleep quality" className='add-mood-quick__sleep-form-quality-head'>Hours Slept</label>
                    <article>
                      <input type="image" src={poorsleep} alt="poor sleep"/>
                      <input type="image" src={okaysleep} alt="okay sleep"/>
                      <input type="image" src={goodsleep} alt="good sleep"/>
                      <input type="image" src={awesomesleep} alt="awesome sleep"/>
                    </article>
                  </div>
                </form>
              </article>

              <article className='add-mood-quick__notes'>
                <form className='add-mood-quick__notes-form'>
                  <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--title'>Title</h3>
                  <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-title" type="Text" placeholder="Add an entry title or keep this blank" />
                  <h3 className='add-mood-quick__notes-form-head add-mood-quick__notes-form-head--note'>Notes</h3>
                  <textarea className="add-mood-quick__notes-form-box add-mood-quick__notes-form-box-note" type="Text" placeholder="Add notes and symptoms or keep this blank" />
                </form>
              </article>

              <article className='add-mood-quick__emote'>
                <form className='add-mood-quick__emote'>
                  <label className='add-mood-quick__emote-head'>Which best represents how you feel?</label>
                  <select className='add-mood-quick__emote-menu'>
                    <optgroup className='add-mood-quick__emote-menugroup'>
                      <option className='add-mood-quick__emote-menugroup-option add-mood-quick__emote-menugroup-option--tired'>
                        <div className='add-mood-quick__emote-menugroup-option--tired-eq'>
                          <img className='add-mood-quick__emote-menugroup-option--tired-emoji' />
                          <h4 className='add-mood-quick__emote-menugroup-option--tired-title'>tired</h4>
                        </div>
                      </option>
                      <option className='add-mood-quick__emote-menugroup-option add-mood-quick__emote-menugroup-option--content'>
                        <div className='add-mood-quick__emote-menugroup-option--content-eq'>
                          <img className='add-mood-quick__emote-menugroup-option--content-emoji' />
                          <h4 className='add-mood-quick__emote-menugroup-option--content-title'>content</h4>
                        </div>
                      </option>
                    </optgroup>
                  </select>
                </form>
              </article>
            </section>

            <section className="add-mood-extended">
              <></>
            </section>
          </section>

        </div>
      </main>
    </>
  );
}

export default App;
