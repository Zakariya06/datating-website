import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getDaysInMonth, getMonth } from 'date-fns';
import React, { useCallback } from 'react';

import Config from '../../config';

export interface IDateSelectProps {
    selectedDate: Date;
    onChange(newDate: Date): void;
}

export const DateSelect = (props: IDateSelectProps) => {
    const { selectedDate, onChange } = props;

    const setDay = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            const newDate = new Date(selectedDate);

            newDate.setDate(Number(event.target.value));
            onChange(newDate);
        },
        [onChange, selectedDate]
    );

    const setMonth = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            const newDate = new Date(selectedDate);

            newDate.setMonth(Number(event.target.value) - 1);
            onChange(newDate);
        },
        [onChange, selectedDate]
    );

    const setYear = useCallback(
        (event: React.ChangeEvent<{ value: unknown }>) => {
            const newDate = new Date(selectedDate);

            newDate.setFullYear(Number(event.target.value));
            onChange(newDate);
        },
        [onChange, selectedDate]
    );

    return (
        <div className="flex">
            <FormControl className="spacing margin top right bottom" variant="outlined" fullWidth margin="dense">
                <InputLabel>Tag</InputLabel>
                <Select
                    style={{
                        borderRadius: '30px',
                    }}
                    onChange={setDay}
                    value={selectedDate.getUTCDate()}
                >
                    {getDayItems(selectedDate)}
                </Select>
            </FormControl>
            <FormControl className="spacing margin all" variant="outlined" fullWidth margin="dense">
                <InputLabel>Monat</InputLabel>
                <Select
                    style={{
                        borderRadius: '30px',
                    }}
                    onChange={setMonth}
                    value={getMonth(selectedDate) + 1}
                >
                    {MonthItems}
                </Select>
            </FormControl>
            <FormControl className="spacing margin left top bottom" variant="outlined" fullWidth margin="dense">
                <InputLabel>Jahr</InputLabel>
                <Select
                    style={{
                        borderRadius: '30px',
                    }}
                    onChange={setYear}
                    value={selectedDate.getFullYear()}
                >
                    {getYearItems()}
                </Select>
            </FormControl>
        </div>
    );
};

const getDayItems = (date: Date) => {
    const a = new Array(getDaysInMonth(date)).fill(0);

    return a.map((v, i) => {
        const val = i + 1;
        return (
            <MenuItem key={String(val)} value={val}>
                {val}
            </MenuItem>
        );
    });
};

const MonthItems = [
    <MenuItem key={1} value={1}>
        Januar
    </MenuItem>,
    <MenuItem key={2} value={2}>
        Februar
    </MenuItem>,
    <MenuItem key={3} value={3}>
        März
    </MenuItem>,
    <MenuItem key={4} value={4}>
        April
    </MenuItem>,
    <MenuItem key={5} value={5}>
        Mai
    </MenuItem>,
    <MenuItem key={6} value={6}>
        Juni
    </MenuItem>,
    <MenuItem key={7} value={7}>
        Juli
    </MenuItem>,
    <MenuItem key={8} value={8}>
        August
    </MenuItem>,
    <MenuItem key={9} value={9}>
        September
    </MenuItem>,
    <MenuItem key={10} value={10}>
        Oktober
    </MenuItem>,
    <MenuItem key={11} value={11}>
        November
    </MenuItem>,
    <MenuItem key={12} value={12}>
        Dezember
    </MenuItem>,
];

const getYearItems = () => {
    const a = new Array(Config.MAX_AGE - Config.MIN_AGE).fill(0);

    const currentYear = new Date().getFullYear();
    const minYear = currentYear - Config.MAX_AGE;

    return a.map((v, i) => {
        const val = minYear + i + 1;
        return (
            <MenuItem key={String(val)} value={val}>
                {String(val)}
            </MenuItem>
        );
    });
};

export default DateSelect;

