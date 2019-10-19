import { TripService } from './../../services/trip.service';
import { Trip } from './../../models/trip';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[];
  constructor(private tripService: TripService ) {
  }
  getTrips(): void {
  this.tripService.getTrips()
      .subscribe(trips => this.trips = trips);
}
  ngOnInit() {
    this.getTrips();
  }

}
