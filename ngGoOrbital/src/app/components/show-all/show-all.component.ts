import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';

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
// sets the local variables
  setTripValues(trip: Trip){

  }


// links account id, but
purchase(id: number){
console.log("purchase() id = " + id);
}
}
