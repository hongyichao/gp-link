import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [NgbRatingConfig]
})
export class RatingComponent implements OnInit {
  currentRate = 2;

  constructor(config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 10;

  }

  ngOnInit() {
  }

}
