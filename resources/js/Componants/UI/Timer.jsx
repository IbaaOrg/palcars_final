import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import './CountdownTimer.css'; // ملف CSS لتنسيق العداد
import { TranslateContext } from '../../Context/Translate';

const CountdownTimer = ({ targetDate }) => {
    const {translates}=useContext(TranslateContext)
    const [remainingTime, setRemainingTime] = useState(moment.duration());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const target = moment(targetDate);
            const diff = moment.duration(target.diff(now));
            setRemainingTime(diff);

            if (diff.asSeconds() <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="countdown-timer w-100">
            <div className="timer-item ">
                <span >{remainingTime.days()} {translates.Day}</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.hours()} {translates.Hour}</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.minutes()} {translates.Minute}</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.seconds()} {translates.Second}</span> 
            </div>
        </div>
    );
};

export default CountdownTimer;
