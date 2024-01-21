import React, { useEffect } from "react";
import "./Success.scss"
import { Link, useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate("/logs");
        }, 5000);

        // timer clear
        return () => clearTimeout(redirectTimer);
    }, [navigate]);

    return (
        <article className="success">
            <h1 className="success-head">Upload Successful</h1>

            <div className="flower">
                <div className="f-wrapper">
                    <div className="flower__line"></div>
                    <div className="f">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__leaf flower__leaf--5"></div>
                        <div className="flower__leaf flower__leaf--6"></div>
                        <div className="flower__leaf flower__leaf--7"></div>
                        <div className="flower__leaf flower__leaf--8"></div>
                    </div>
                </div>

                <div className="f-wrapper f-wrapper--2">
                    <div className="flower__line"></div>
                    <div className="f">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__leaf flower__leaf--5"></div>
                        <div className="flower__leaf flower__leaf--6"></div>
                        <div className="flower__leaf flower__leaf--7"></div>
                        <div className="flower__leaf flower__leaf--8 flower__fall-down--pink"></div>
                    </div>
                </div>

                <div className="f-wrapper f-wrapper--3">
                    <div className="flower__line"></div>
                    <div className="f">
                        <div className="flower__leaf flower__leaf--1"></div>
                        <div className="flower__leaf flower__leaf--2"></div>
                        <div className="flower__leaf flower__leaf--3"></div>
                        <div className="flower__leaf flower__leaf--4"></div>
                        <div className="flower__leaf flower__leaf--5"></div>
                        <div className="flower__leaf flower__leaf--6"></div>
                        <div className="flower__leaf flower__leaf--7"></div>
                        <div className="flower__leaf flower__leaf--8"></div>
                    </div>
                </div>
            </div>

            <p className="success-details">You'll be redirected to your new log in 5 seconds. Or you can {" "}
                <Link className="success-details__redirect" to="logs">
                    click here
                </Link>
            </p>
        </article>
    );
}

export default Success;