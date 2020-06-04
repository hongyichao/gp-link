import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [NgbRatingConfig]
})
export class RatingComponent implements OnInit {
  @Input() currentRate: number;
  @Input() isEditable: boolean;

  constructor(config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 10;
  }

  ngOnInit() {
  }

}
