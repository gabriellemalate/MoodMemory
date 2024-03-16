import React, { useState, useEffect } from 'react';
import './Logged.scss';
import LoggedExpand from '../LoggedExpand/LoggedExpand';
import { auth } from '../../firebase';
import { theblue, thedeep, theyellow, theorange, liteyellow, thegreen, thered } from '../../styles/variables';

function Logged({ logData, searchTerm }) {
    const [expanded, setExpanded] = useState(false);
    const [userUid, setUserUid] = useState(null);

    useEffect(() => {
        // Get the current user's UID
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserUid(currentUser.uid);
        }
    }, []);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const formatShortYear = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
        const day = date.getDate(); // Get day of the month

        return `${month} ${day}`;
        // const dateParts = dateString.split('/');
        // if (dateParts.length === 3) {
        //     // Extract month, day, and year
        //     const month = dateParts[0].padStart(2, '0'); // Add leading zero if single digit
        //     const day = dateParts[1].padStart(2, '0'); // Add leading zero if single digit
        //     const year = dateParts[2].substring(2); // Extract the last two digits of the year
        //     return `${month}/${day}/${year}`;
        // }
        // return dateString;
    };

    const isMatch = (log) => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        const lowercaseTitle = log.title.toLowerCase();
        const lowercaseEmotion = log.emotion.toLowerCase();
        const lowercaseLevel = log.level.toLowerCase();

        // Check if the title or emotion includes the search term
        return lowercaseTitle.includes(lowercaseSearchTerm) || lowercaseEmotion.includes(lowercaseSearchTerm) || lowercaseLevel.includes(lowercaseSearchTerm);
    };

    let backgroundColor;

    switch (logData.emoji) {
        case "anxious":
        case "unmotivated":
        case "down":
            backgroundColor = "rgba(17, 95, 121, 0.851)";
            break;
        case "exhausted":
        case "hopeless":
        case "panic":
            backgroundColor = "rgba(0, 0, 0, 0.753)";
            break;
        case "frustrated":
        case "angry":
        case "sad":
            backgroundColor = "rgba(0, 0, 255, 0.763)";
            break;
        case "tired":
        case "annoyed":
            backgroundColor = "rgba(245, 210, 54, 0.818)";
            break;
        case "irritable":
        case "worried":
        case "stressed":
            backgroundColor = "rgba(290, 146, 0, 0.792)";
            break;
        case "unsure":
        case "wired":
            backgroundColor = "rgba(247, 245, 0, 0.74)";
            break;
        case "happy":
        case "loving":
        case "relaxed":
        case "satisfied":
        case "grateful":
            backgroundColor = "rgba(22, 201, 22, 0.729)";
            break;
        case "motivated":
        case "proud":
        case "energized":
        case "excited":
            backgroundColor = "rgba(255, 0, 123, 0.896)";
            break;
        default:
            // Default color or error handling
            backgroundColor = "initial"; // or any default color you prefer
            break;
    }

    return (
        <>

            {isMatch(logData) && (
                <article
                    className={`logged ${expanded ? 'expanded' : 'compressed'}`}>
                    <div className='logged-eq' onClick={toggleExpand} >

                        <div className='logged__frame' style={{ backgroundColor: backgroundColor }}>
                            <img className='logged__frame-emoji' alt='logged emotion'  src={require(`../../assets/emotes/${logData.emoji}.png`)} />
                        </div>
                        <div className='logged-info'>
                            <div className='logged-info__top'>
                                <div className='logged-info__top-left'>
                                    <h2 className='logged-info__top-left-emotion'>{logData.emotion}</h2>
                                </div>
                                <div className='logged-info__top-right'>
                                    <h2 className='logged-info__top-right-date'>{logData.date && formatShortYear(logData.date.toDate().toLocaleDateString())}</h2>
                                </div>
                            </div>
                            <h3 className='logged-info__top-left-title'>{logData.title}</h3>
                            <div className='logged-info__bottom'>
                                <div className='logged-info__bottom-eq'>
                                    <h2 className='logged-info__bottom-state'>{logData.state} {logData.level}</h2>
                                    <div className='logged-info__bottom-lower'>
                                        <span className='logged-info__bottom-lower-item'>Irr:<b className='logged-info--bold'>{logData.irritability}</b></span>
                                        <span className='logged-info__bottom-lower-item'>Anx:<b className='logged-info--bold'>{logData.anxiety}</b></span>
                                        <span className='logged-info__bottom-lower-item'> Hrs:<b className='logged-info--bold'>{logData.hours}</b></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {expanded && <LoggedExpand logData={logData} />}
                </article >
            )}
        </>
    );
}

export default Logged;