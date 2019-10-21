import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  currentRate = 8;

  trip: any;   // variable
  trips: any;  // array of variables;
  constructor() { }

  ngOnInit() {
  }

  viewMore(id: number) {


  }

}
