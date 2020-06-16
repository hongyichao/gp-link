import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-app-date-picker',
  templateUrl: './app-date-picker.component.html',
  styleUrls: ['./app-date-picker.component.css']
})
export class AppDatePickerComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  @Output() dateChangedEvent = new EventEmitter();

  constructor(private calendar: NgbCalendar) {


  }

  ngOnInit(): void {
  }

  setDate(event) {
    this.date = event;
    this.dateChangedEvent.emit(event);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}

