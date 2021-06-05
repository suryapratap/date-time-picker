import { ThrowStmt } from '@angular/compiler';
import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

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
export class AppComponent implements OnInit {
    @ViewChild('date_range_component', { static: true })
    date_range_component: OwlDateTimeComponent<AppComponent>;
    public selectedDates = [];


    currentValue: Date;
    endValue: Date;

    open_once = true;
    ngOnInit() {
        this.currentValue = dayjs('2019-03-11T00:00:00Z').toDate();
        this.endValue = dayjs('2019-03-11T15:00:00Z').toDate();
        this.selectedDates[0] = dayjs(this.currentValue);
        this.selectedDates[1] = dayjs(this.endValue);

    }

    recordChanges(event) {
        console.log(dayjs(event).format('YYYY-MM-DDTHH:mm:ss'));
    }
}
