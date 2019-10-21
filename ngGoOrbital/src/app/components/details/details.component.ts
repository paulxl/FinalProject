import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  trip: any;   // variable
  trips: any;  // array of variables;
  constructor() { }

  ngOnInit() {
  }

  viewMore(id: number) { }

}
