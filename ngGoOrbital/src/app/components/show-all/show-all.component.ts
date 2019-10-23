import { TripService } from './../../services/trip.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  currentRate = 8;
  id: any;

  // <a [routerLink]="['/search']">Search</a> |


  trip: any;   // variable
  trips: any;  // array of variables;
  constructor(private route: ActivatedRoute,
    private tripService: TripService,
    private router: Router) {


  }

  ngOnInit() {
    this.tripService.getTrip(1);
    this.id =  this.route.snapshot.paramMap.get('id');
    this.getTrip(this.id);
  }
  // sets the local variables
  setTripValues(trip: Trip) {

  }
  getTrip(id: number): void {
    this.trip = this.tripService.getTrip(id)
      .subscribe(trip => this.trip = trip);
    console.log("***********************" + this.trip.values);
  }

  // links account id, but
  purchase(trip: Trip) {
    console.log('*******************************purchase() id = ' + this.trip);
    if (confirm('Would You like to Purchase ' + this.trip.name + ' for  ' + this.trip.cost)) {

    }
    // route to account page
  }


  /** GET trip by id. Return `undefined` when id not found */
  getTrip1(id: number): void {
    this.tripService.getTrip(1).subscribe(trip => this.trip = trip);
    console.log(this.trip.value);
  }
}
