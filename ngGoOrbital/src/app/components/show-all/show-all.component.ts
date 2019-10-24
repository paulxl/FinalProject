import { Traveler } from 'src/app/models/traveler';
import { TravelerService } from 'src/app/services/traveler.service';
import { TripService } from './../../services/trip.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
  travelerLocal: Traveler;
  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private travelerService: TravelerService,
              private router: Router,
              private authServ: AuthService,
              private userServ: UserService) {

  }

  ngOnInit() {
    this.tripService.getTrip(1);
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTrip(this.id);
    // this.travelerLocal = this.travelerService.getTraveler()
    this.getTraveler();
  }
  getTraveler() {
    let user: User;
  }


  reload() {
    let user: User;
    const username = this.authServ.getLoggedInUserName();
    this.userServ.getUserByName(username).subscribe(
      good => {
        user = good;
      },
      bad => {
        console.error(bad);
      }
    );

    this.travelerService.getTraveler(user.id).subscribe(
      good => {
        this.travelerLocal = good;
      },
      bad => {
        console.error(bad)
      }
    );

  }


  // sets the local variables
  setTripValues(trip: Trip) {

  }
  getTrip(id: number): void {
    this.trip = this.tripService.getTrip(id)
      .subscribe(trip => this.trip = trip);
    console.log('***********************' + this.trip.values);
  }

  // links account id, but
  purchase(id: any) {
    console.log('*******************************purchase() id = ' + this.trip);
    if (confirm('Would You like to Purchase ' + this.trip.name)) {

      // get traveler
      this.travelerService.getTraveler(1).subscribe(travelerLocal => this.travelerLocal = travelerLocal);

      // update traveler
      this.travelerLocal.trips.push(this.trip);

      // post traveler
      this.travelerService.updateTraveler(this.travelerLocal);

      console.log('*******************************purchase() id = ' + this.trip);

    }
    // route to account page
  }


  /** GET trip by id. Return `undefined` when id not found */
  getTrip1(id: number): void {
    this.tripService.getTrip(1).subscribe(trip => this.trip = trip);
    console.log(this.trip.value);
  }
}
