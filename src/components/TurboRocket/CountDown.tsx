import { Typography } from '@material-ui/core';
import { intervalToDuration } from 'date-fns';
import React, { useEffect, useState } from 'react';

export interface ICountDownProps {
    endDate: Date;
}

export const CountDown = (props: ICountDownProps) => {
    const { endDate } = props;
    const [duration, setduration] = useState<Duration>(intervalToDuration({ end: endDate, start: new Date() }));

    useEffect(() => {
        const interval = window.setInterval(() => {
            setduration(intervalToDuration({ end: endDate, start: new Date() }));
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, [endDate]);

    const { seconds = 0, minutes = 0, hours = 0, days = 0 } = duration;

    return (
        <div className="flex row ">
            {days > 0 && (
                <Typography variant="h4" style={{ fontWeight: 300 }}>
                    {formatNumber(days)}:
                </Typography>
            )}
            <Typography variant="h4" style={{ fontWeight: 300 }}>
                {formatNumber(hours)}:
            </Typography>
            <Typography variant="h4" style={{ fontWeight: 300 }}>
                {formatNumber(minutes)}:
            </Typography>
            <Typography variant="h4" style={{ fontWeight: 300 }}>
                {formatNumber(seconds)}
            </Typography>
        </div>
    );
};

const formatNumber = (value: number) => String(value).padStart(2, '0');

export default CountDown;
