/**
 * moment-date-time-adapter.class
 */

import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { Dayjs } from 'dayjs';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from '../date-time-adapter.class';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as LocalizedFormat from 'dayjs/plugin/localizedFormat';
import * as localeData from 'dayjs/plugin/localeData';
import * as  objectSupport from 'dayjs/plugin/objectSupport';
import * as  timezone from 'dayjs/plugin/timezone';
dayjs.extend(objectSupport);
dayjs.extend(LocalizedFormat);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);



/** Configurable options for {@see MomentDateAdapter}. */
export interface OwlDayjsDateTimeAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how the DateTimePicker output value.
     * {@default false}
     */
    useUtc: boolean;

    /**
     * Turns the use of strict string parsing in moment.
     * Changing this will change how the DateTimePicker interprets input.
     * {@default false}
     */
    parseStrict: boolean;
}

/** InjectionToken for moment date adapter to configure options. */
export const OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS = new InjectionToken<OwlDayjsDateTimeAdapterOptions>(
    'OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY
});

/** @docs-private */
export function OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS_FACTORY(): OwlDayjsDateTimeAdapterOptions {
    return {
        useUtc: false,
        parseStrict: false
    };
}

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}


@Injectable()
export class DayjsDateTimeAdapter extends DateTimeAdapter<Dayjs> {

    private _localeData: {
        longMonths: string[],
        shortMonths: string[],
        longDaysOfWeek: string[],
        shortDaysOfWeek: string[],
        narrowDaysOfWeek: string[],
        dates: string[],
    };

    constructor(@Optional() @Inject(OWL_DATE_TIME_LOCALE) private owlDateTimeLocale: string,
        @Optional() @Inject(OWL_DAYJS_DATE_TIME_ADAPTER_OPTIONS) private options?: OwlDayjsDateTimeAdapterOptions) {
        super();
        this.setLocale(owlDateTimeLocale || dayjs.locale());
    }

    public setLocale(locale: string) {
        super.setLocale(locale);
        dayjs.locale(locale)
        const momentLocaleData = dayjs.localeData();
        this._localeData = {
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin(),
            dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
        };
    }


    public getYear(date: Dayjs): number {
        return (date).year();
    }

    public getMonth(date: Dayjs): number {
        return (date).month();
    }

    public getDay(date: Dayjs): number {
        return (date).day();
    }

    public getDate(date: Dayjs): number {
        return (date).date();
    }

    public getHours(date: Dayjs): number {
        return (date).hour();
    }

    public getMinutes(date: Dayjs): number {
        return (date).minute();
    }

    public getSeconds(date: Dayjs): number {
        return (date).second();
    }

    public getTime(date: Dayjs): number {
        return (date).valueOf();
    }

    public getNumDaysInMonth(date: Dayjs): number {
        return (date).daysInMonth();
    }

    public differenceInCalendarDays(dateLeft: Dayjs, dateRight: Dayjs): number {
        return (dateLeft).diff(dateRight, 'day');
    }

    public getYearName(date: Dayjs): string {
        return (date).format('YYYY');
    }

    public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
        return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
    }

    public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    }

    public getDateNames(): string[] {
        return this._localeData.dates;
    }

    public toIso8601(date: Dayjs): string {
        return (date).format();
    }

    public isEqual(dateLeft: Dayjs, dateRight: Dayjs): boolean {

        if (dateLeft && dateRight) {
            return (dateLeft).isSame((dateRight));
        }

        return dateLeft === dateRight;
    }

    public isSameDay(dateLeft: Dayjs, dateRight: Dayjs): boolean {

        if (dateLeft && dateRight) {
            return (dateLeft).isSame((dateRight), 'day');
        }

        return dateLeft === dateRight;
    }

    public isValid(date: Dayjs): boolean {
        return (date).isValid();
    }

    public invalid(): Dayjs {
        return dayjs('');
    }

    public isDateInstance(obj: any): boolean {
        return dayjs.isDayjs(obj);
    }

    public addCalendarYears(date: Dayjs, amount: number): Dayjs {
        return date.add(amount, "year");
    }

    public addCalendarMonths(date: Dayjs, amount: number): Dayjs {
        return date.add(amount, 'month');
    }

    public addCalendarDays(date: Dayjs, amount: number): Dayjs {
        return (date).add(amount, "day");
    }

    public setHours(date: Dayjs, amount: number): Dayjs {
        return (date).hour(amount);
    }

    public setMinutes(date: Dayjs, amount: number): Dayjs {
        return (date).minute(amount);
    }

    public setSeconds(date: Dayjs, amount: number): Dayjs {
        return (date).second(amount);
    }

    public createDate(year: number, month: number, date: number): Dayjs;
    public createDate(year: number, month: number, date: number, hours: number = 0, minutes: number = 0, seconds: number = 0): Dayjs {
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }

        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }

        if (hours < 0 || hours > 23) {
            throw Error(`Invalid hours "${hours}". Hours has to be between 0 and 23.`);
        }

        if (minutes < 0 || minutes > 59) {
            throw Error(`Invalid minutes "${minutes}". Minutes has to between 0 and 59.`);
        }

        if (seconds < 0 || seconds > 59) {
            throw Error(`Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`);
        }

        const result = this.createMoment({ year, month, date, hours, minutes, seconds }).locale(this.getLocale());

        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }

        return result;
    }

    public clone(date: Dayjs): Dayjs {
        return this.createMoment(date).clone().locale(this.getLocale());
    }

    public now(): Dayjs {
        return this.createMoment().locale(this.getLocale());
    }

    public format(date: Dayjs, displayFormat: any): string {
        date = (date);
        if (!this.isValid(date)) {
            throw Error('MomentDateTimeAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }

    public parse(value: any, parseFormat: any): Dayjs | null {
        if (value && typeof value === 'string') {
            return this.createMoment(value, parseFormat, this.getLocale(), this.parseStrict);
        }
        return value ? this.createMoment(value).locale(this.getLocale()) : null;
    }

    get parseStrict() {
        return this.options && this.options.parseStrict;
    }

    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: any): Dayjs | null {
        let date;
        if (value instanceof Date) {
            date = this.createMoment(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.createMoment(value, 'YYYY-MM-DDTHH:mm:ssZ', this.parseStrict).locale(this.getLocale());
        }
        if (date && this.isValid(date)) {
            return date;
        }
        return super.deserialize(value);
    }

    /** Creates a Moment instance while respecting the current UTC settings. */
    private createMoment(...args: any[]): Dayjs {
        return (this.options && this.options.useUtc) ? dayjs.utc(...args) : dayjs(...args);
    }
}
