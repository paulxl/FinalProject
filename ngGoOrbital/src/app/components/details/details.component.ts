import { TripService } from './../../services/trip.service';
import { Trip } from './../../models/trip';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private tripservice: TripService, ) { }

  currentRate = 8;
   trip: Trip;   // variable
   trips: Trip[];  // array of variables;
  ngOnInit() {
    this.showAllTrips();
    console.log('ngOnInit = many trips = ' + this.trips.values);
    console.log('ngOnInit = many trips = ' + this.trips);

  }

  showAllTrips() {
    this.tripservice.getTrips()
    .subscribe(trips => this.trips = trips);
    console.log(this.trips.values);
  }
  showDetailById(id: number) {
    this.tripservice.getTrip(id);
    console.log('entering showDetailById = ' + id + ' trip = ' + this.trip);
  }
  getTrips(): void {
    this.tripservice.getTrips()
        .subscribe(trips => this.trips = trips);
    console.log(this.trips.values);
  }
}
