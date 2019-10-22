import { CompaniesService } from 'src/app/services/companies.service';
import { CompaniesService } from './../../services/companies.service';
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
  companiess: Companies[] = [];


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
  }

  getTrips(trip: Trip) {
    this.selected = trip;
  }



  searchByDest(trip: Trip) {
    this.selected = trip;
    this.tripService.getTrips()
    .subscribe(data => (this.trips = data),
    err => console.error('Observer got an error:' + err)
  );

  }



}
