import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  currentRate = 8;

  trip: any;   // variable
  trips: any;  // array of variables;
  constructor() { }

  ngOnInit() {
  }

}
