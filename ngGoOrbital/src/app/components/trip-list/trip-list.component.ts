import { TravelerTrip } from './../../models/traveler-trip';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from './../../services/trip.service';
import { Trip } from './../../models/trip';
import { Component, OnInit, Input } from '@angular/core';
import { TravelerService } from 'src/app/services/traveler.service';
import { TravelerTripService } from 'src/app/services/traveler-trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  @Input() trips: Trip[];
  constructor(
    private tripService: TripService,
    private auth: AuthService,
    private travService: TravelerService,
    private travTripService: TravelerTripService
     ) {
  }
  getTrips(): void {
  this.tripService.getTrips()
      .subscribe(trips => this.trips = trips);
  console.log(this.trips.values);
}
  ngOnInit() {
    this.getTrips();
  }

  isTraveler(): boolean {
    return this.auth.isTraveler();
  }

  signUpForTrip(trip: Trip) {
    const tTrip: TravelerTrip = new TravelerTrip();
    tTrip.trip = trip;
    this.travService.getTravelerByUserId(this.auth.getLoggedInUserId()).subscribe(
      traveler => {
        tTrip.traveler = traveler;
        console.log('TripListComponent.signUpForTrip(): ');
        console.log(tTrip);
        this.travTripService.addTrip(tTrip).subscribe(
          good => {
            console.log('TravelerTrip added: ');
            console.log(good);


          },
          bad => {
            console.error('Error adding TravelerTrip:');
            console.error(bad);


          }
        );
      },
      bad => {}
    );
  }
}
