import { Traveler } from "src/app/models/traveler";
import { TravelerTrip } from "../../models/traveler-trip";
import { Component, OnInit } from "@angular/core";
import { TravelerService } from "src/app/services/traveler.service";

import { TripService } from "src/app/services/trip.service";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user";
//import { Trip } from 'src/app/models/trip';

@Component({
  selector: "app-traveler",
  templateUrl: "./traveler.component.html",
  styleUrls: ["./traveler.component.css"]
})
export class TravelerComponent implements OnInit {
  // traveler: any;
  // trips: any;  //is a list of trips
  // user: any; //ties to user profile (security-bypasser);
  editTraveler: Traveler = null;
  selected: Traveler = null;
  //trips: TravelerTrip[] = [];
  editUser: User = null;
  traveler: Traveler;

  constructor(
    private travServ: TravelerService,
    private tripServ: TripService
  ) {}

  ngOnInit() {
    const traveler = this.selected;
    // need to get traveler in after authentication
  }

  setDisplayMyTrips() {
    this.travServ.getTraveler(this.selected.id).subscribe(
      data => {
        this.traveler = data;
      },
      err => {
        console.error("trouble in get traveler info to display trips");
      }
    );
  }

  setEditTraveler() {
    this.editTraveler = Object.assign({}, this.selected);
  }
  changeTraveler(form: NgForm) {
    const changeTraveler: Traveler = form.value;
    this.travServ.updateTraveler(changeTraveler).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error("Error on update traveler info " + err);
      }
    );
  }
  setReviewTrips() {
    this.travServ.getTraveler(this.selected.id).subscribe(
      data => {
        this.traveler = data;
      },
      err => {
        console.error("Loading travelerTrips got an error: " + err);
      }
    );
  }
  editTripRecord(id: number) {
    this.editTraveler = Object.assign({}, this.selected);
  }
  updateReview(form: NgForm) {
    const updateReview: Traveler = form.value;
    this.travServ.updateTraveler(updateReview).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error("Error in update traveler " + err);
      }
    );
  }
}
