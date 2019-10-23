import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies.service';
import { TripService } from './../../services/trip.service';
import { Companies } from './../../models/companies';
import { Trip } from './../../models/trip';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // Fields

  newTrip: Trip = new Trip();
  destinations: Trip['destination'][] = [];
  newCompanies: Companies = new Companies();
  selected: Trip = null;
  trips: Trip[] = [];
  companiess: Companies;
  showT = false;
  showC = false;

  // Constructors
  constructor(private tripService: TripService, private compService: CompaniesService) { }
  // Methods

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.tripService.getTrips()
    .subscribe(
      data => (this.trips = data),
      err => console.error('Observer got an error:' + err)
    );
    this.compService.getCompany()
    .subscribe(
      data => (this.companiess = data),
      err => console.error('Observer got an error:' + err)
    );
    console.log(this.companiess.length);

  }

  getTrips(trip: Trip) {
    this.selected = trip;
  }

  searchByDest(form: NgForm) {
    const sbd: string = form.value.destination;
    this.showT = true;
    this.tripService.searchTrips(sbd)
    .subscribe(
      data => {(this.trips = data);
               console.log(this.trips);
      },
      err => console.error('Observer got an error:' + err)
    );
  }

  searchByComp(form: NgForm) {
    const sbc: string = form.value.companies;
    this.showC = true;
    this.compService.searchCompanies(sbc)
    .subscribe(
      data => {(this.companiess = data);
               this.trips = this.companiess.trips; },
      err => console.error('Observer got an error:' + err)
    );
  }

}
