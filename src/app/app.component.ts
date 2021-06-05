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
        dayjs('2019-03-11T00:00:00Z'),
        dayjs('2019-03-11T15:00:00Z')
    ];


    currentValue: Date = this.selectedDates[0]?.toDate();
    endValue: Date = this.selectedDates[1]?.toDate();

    open_once = true;

    ngAfterViewInit() {
    }

    recordChanges(event) {
        console.log(dayjs(event).format('YYYY-MM-DDTHH:mm:ss'));
    }
}
