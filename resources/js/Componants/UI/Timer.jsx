import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './CountdownTimer.css'; // ملف CSS لتنسيق العداد

const CountdownTimer = ({ targetDate }) => {
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
                <span >{remainingTime.days()} Day</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.hours()} Hour</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.minutes()} Minute</span> 
            </div>
            <div className="timer-item">
                <span>{remainingTime.seconds()} Second</span> 
            </div>
        </div>
    );
};

export default CountdownTimer;
