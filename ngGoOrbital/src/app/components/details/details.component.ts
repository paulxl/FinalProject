import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TripService } from './../../services/trip.service';
import { Trip } from './../../models/trip';
import { Component, OnInit } from '@angular/core';
import { TravelerService } from 'src/app/services/traveler.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private tripservice: TripService,
    private travelerService: TravelerService,
    private route: ActivatedRoute
  ) { }

  currentRate = 8;
  trip: Trip;   // variable
  trips: Trip[];  // array of variables;
  id: any;

  ngOnInit() {
    this.showAllTrips();
    console.log('ngOnInit = many trips = ' + this.trips.values);
    console.log('ngOnInit = many trips = ' + this.trips);
    this.id = this.route.snapshot.paramMap.get('id');
  }

  showAllTrips() {
    this.tripservice.getTrips()
      .subscribe(trips => this.trips = trips);
    console.log(this.trips.values);
  }
  showDetailById(id: number) {
    this.tripservice.getTrip(id);
    console.log('entering showDetailById = ' + id + ' trip = ' + this.trip);
    this.router.navigateByUrl('detail/id/' + id);

  }


  getTrips(): void {
    this.tripservice.getTrips()
      .subscribe(trips => this.trips = trips);
    console.log(this.trips.values);
  }

}
