import { AfterViewInit, Component, ViewChild } from '@angular/core';

import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

import { OwlDateTimeComponent } from '../../projects/picker/src/public_api';
dayjs.extend(utc);
dayjs.extend(timezone);
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('date_range_component', { static: true })
    date_range_component: OwlDateTimeComponent<AppComponent>;
    public selectedDates = [
        dayjs('2019-03-11T08:00:00+11:00').tz('America/Los_Angeles'),
        dayjs('2019-03-11T15:00:00+11:00').tz('America/Los_Angeles')
    ];


    currentValue: Date = new Date('4/21/2020, 12:00 AM');
    endValue: Date = new Date('4/21/2020, 11:59 PM');

    open_once = false;

    ngAfterViewInit() {
    }
}
