import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alertMsg: string;
  @Output() closeAlert = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.closeAlert.emit();
  }
}
