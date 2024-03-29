import "./LoadingPage.scss";
import { Link } from "react-router-dom";

function LoadingPage() {

    return (
        <main className="loadingpage">
                        <h1 className="loadingpage__head">...Loading...</h1>
            <div className="container">

                <div className="sun"></div>

                <div className="bumps">
                    <div className="inner">
                        <div className="bump"></div>
                        <div className="bump"></div>
                        <div className="bump"></div>
                        <div className="bump"></div>
                    </div>
                </div>

                <div className="character">

                    <div className="head">
                        <div className="eye"></div>
                        <div className="eye"></div>
                        <div className="mouth">
                            <svg className="mouth-shadow" viewBox="0 0 140 70">
                                <path d="M0.719238 10.072C0.593337 9.19833 0.90809 11.3826 0.902179 11.3388C0.171209 5.92824 5.26432 0.0485929 10.7239 0.000389747C10.768 0 9.65972 0 10.103 0C10.7062 0 11.0078 0 11.0427 0.000243102C16.4269 0.037787 19.5259 2.52743 20.7228 7.77705C20.7305 7.81105 20.8785 8.48175 21.1745 9.82315C26.1201 32.2342 46.1021 49 70 49C93.8979 49 113.88 32.2342 118.825 9.82314C119.121 8.48175 119.269 7.81105 119.277 7.77706C120.474 2.52743 123.573 0.0377857 128.957 0.000243085C128.992 0 129.294 0 129.897 0C130.34 0 129.232 0 129.276 0.00038972C134.736 0.0485912 139.829 5.92824 139.098 11.3388C139.092 11.3826 139.407 9.19831 139.281 10.072C134.398 43.9598 105.24 70 70 70C34.7603 70 5.6025 43.9598 0.719238 10.072Z"></path>
                            </svg>

                            <svg className="flipper" viewBox="0 0 140 70">
                                <path d="M0.719238 10.072C0.593337 9.19833 0.90809 11.3826 0.902179 11.3388C0.171209 5.92824 5.26432 0.0485929 10.7239 0.000389747C10.768 0 9.65972 0 10.103 0C10.7062 0 11.0078 0 11.0427 0.000243102C16.4269 0.037787 19.5259 2.52743 20.7228 7.77705C20.7305 7.81105 20.8785 8.48175 21.1745 9.82315C26.1201 32.2342 46.1021 49 70 49C93.8979 49 113.88 32.2342 118.825 9.82314C119.121 8.48175 119.269 7.81105 119.277 7.77706C120.474 2.52743 123.573 0.0377857 128.957 0.000243085C128.992 0 129.294 0 129.897 0C130.34 0 129.232 0 129.276 0.00038972C134.736 0.0485912 139.829 5.92824 139.098 11.3388C139.092 11.3826 139.407 9.19831 139.281 10.072C134.398 43.9598 105.24 70 70 70C34.7603 70 5.6025 43.9598 0.719238 10.072Z"></path>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            <div className="loadingpage__redirect"> Taking too long?
                <ul className="loadingpage__redirect-eq">
                    <li><Link className="loadingpage__redirect-mood" to="/logs">Mood Logs</Link> </li>
                    <li><Link className="loadingpage__redirect-sign" to="/">Sign In Page</Link></li>
                </ul>
            </div>
        </main>
    );
}
export default LoadingPage;