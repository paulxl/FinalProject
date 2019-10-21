import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.css']
})
export class TravelerComponent implements OnInit {
  traveler: any;
  trips: any;  // is a list of trips
  user: any; // ties to user profile (security-bypasser);
  constructor() { }

  ngOnInit() {
  }

  // Basic C.R.U.D. below

  deleteTraveler(id: number) { }

  addNewTraveler(traveler: any) { }

  updateTraveler(id: number) { }

  addNewTrips(trips: any) { }

}
