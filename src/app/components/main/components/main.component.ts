import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateInterface } from '../types';
import * as moment from 'moment';

@Component({
  selector: 'date-calc-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  resultCalc: string = '';
  isError: boolean = false;

  date = this.fb.nonNullable.group({
    yearInit: '',
    monthInit: '',
    dayInit: '',
    hourInit: '',
    minuteInit: '',
    yearEnd: '',
    monthEnd: '',
    dayEnd: '',
    hourEnd: '',
    minuteEnd: '',
  });

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    const dateStart: DateInterface = {
      year: this.date.getRawValue().yearInit,
      month: this.date.getRawValue().monthInit,
      day: this.date.getRawValue().dayInit,
      hour: this.date.getRawValue().hourInit,
      minute: this.date.getRawValue().minuteInit,
    };

    const dateEnd: DateInterface = {
      year: this.date.getRawValue().yearEnd,
      month: this.date.getRawValue().monthEnd,
      day: this.date.getRawValue().dayEnd,
      hour: this.date.getRawValue().hourEnd,
      minute: this.date.getRawValue().minuteEnd,
    };

    const dateStartValid = this.validateInput(this.getDate(dateStart));

    const dateEndValid = this.validateInput(this.getDate(dateEnd));

    if (dateStartValid && dateEndValid) {
      this.calcDifference(this.getDate(dateStart), this.getDate(dateEnd));
    } else {
      this.isError = true;
      this.resultCalc = '';
    }
  }

  getDate({ year, month, day, hour, minute }: DateInterface): Date {
    const date = new Date(`${year}-${month}-${day} ${hour}:${minute}`);
    return date;
  }

  calcDifference(dateStart: Date, dateEnd: Date): void {
    this.isError = false;

    const date1 = moment(dateStart);
    const date2 = moment(dateEnd);
    const duration = moment.duration(date2.diff(date1));

    const yearsDiff = duration.years();
    const monthsDiff = duration.months();
    const daysDiff = duration.days();
    const hoursDiff = duration.hours();
    const minutesDiff = duration.minutes();

    this.resultCalc = `${yearsDiff} years, ${monthsDiff} months, \n ${daysDiff} days, ${hoursDiff} hours, ${minutesDiff} min`;
  }

  validateInput(date: Date): boolean {
    let isValid = true;

    isValid = !isNaN(Date.parse(date.toString()));

    return isValid;
  }
}
