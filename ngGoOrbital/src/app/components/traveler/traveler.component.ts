import { TravelerTrip } from './../../models/traveler-trip';
import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Traveler } from 'src/app/models/traveler';
import { Component, OnInit } from '@angular/core';
import { TravelerService } from 'src/app/services/traveler.service';

import { TripService } from 'src/app/services/trip.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { TravelerTripService } from 'src/app/services/traveler-trip.service';
// import { Trip } from 'src/app/models/trip';



@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.css']
})



export class TravelerComponent implements OnInit {
  // traveler: any;
  // trips: any;  //is a list of trips
  // user: any; //ties to user profile (security-bypasser);


  editTraveler: Traveler = null;
  selected: Traveler = null;
  // trips: TravelerTrip[] = [];
  editUser: User = null;
  traveler: Traveler;
  start = null;
  dT = null;
  eT = null;
  trips: TravelerTrip[] = [];
  selectedTrip: TravelerTrip = null;

  id: any;

  constructor(
    private travServ: TravelerService,
    private tripServ: TravelerTripService,
    private authServ: AuthService,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.start = true;
    this.reload();
   // const traveler = this.selected;
    // need to get traveler in after authentication
  }
  reload() {
    let user: User;
    const username = this.authServ.getLoggedInUserName();
    this.userServ.getUserByName(username).subscribe(
      good => {
        user = good;
        this.travServ.getTravelerByUserId(user.id).subscribe(
          success => {
            this.selected = success;
            this.travServ.getTravelerTripsByUserId(user.id).subscribe(
              yay => {
                console.log('Got traveler trips');
                console.log(yay);
                this.trips = yay;
              },
              boo => {
                console.error('Error getting traveler trips');
                console.error(boo);
              }
            );
          },
          fail => {
            console.error(fail);
          }
        );
        this.start = true;

      },
      bad => {
        console.error(bad);
      }
    );
   }

  setDisplayMyTrips() {

    this.dT = true;
    this.travServ.getTraveler(this.selected.id).subscribe(
      data => { this.traveler = data; },
      err => { console.error('trouble in get traveler info to display trips'); }
    );
    this.start = false;
  }

  setEditTraveler() {
    this.editTraveler = Object.assign({}, this.selected);
    this.eT = true;
  }
  changeTraveler(form: NgForm) {
    const changeTraveler: Traveler = form.value;
    this.travServ.updateTraveler(changeTraveler).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {

        console.error('Error on update traveler info ' + err);
      }
    );
    this.eT = false;
    this.ngOnInit();
  }

  setReviewTrips() {
    this.travServ.getTraveler(this.selected.id).subscribe(
      data => {
        this.traveler = data;
      },
      err => {
        console.error('Loading travelerTrips got an error: ' + err);
      }
    );
  }

  editTripRecord(id: number) {
    this.editTraveler = Object.assign({}, this.selected);
    this.eT = true;
  }

  deleteTravelerTrip(trip: TravelerTrip) {
    this.tripServ.deleteTravelerTrip(trip).subscribe(
      good => {
        console.log('TravelerTrip deleted');
        this.reload();
      },
      bad => {
        console.error('Error deleting traveler trip');
        console.error(bad);
      }
    );

  }

  goToEditTrip(tTrip: TravelerTrip) {
    this.selectedTrip = Object.assign({}, tTrip);
  }

  updateTraveler(form: NgForm) {
    const updateReview: Traveler = form.value;
    this.travServ.updateTraveler(updateReview).subscribe(
      data => {
        this.reload();
      },
      err => {

        console.error('Error in update traveler ' + err);
      }
    );
  }

  updateReview(updatedTrip: TravelerTrip) {
    this.tripServ.updateTravelerTrip(updatedTrip).subscribe(
      data => {
        console.log('TravelerTrip updated');
        this.selectedTrip = null;

        this.reload();
      },
      err => {

        console.error('Error in update traveler trip' + err);
      }
    );
  }

}
