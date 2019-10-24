import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  companiess: Companies[];
  show = false;

  // Constructors
  constructor(private router: Router, private tripService: TripService, private compService: CompaniesService) { }
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
    // console.log(this.companiess.length);

  }

  getTrips(trip: Trip) {
    this.selected = trip;
  }

  searchByDest(form: NgForm) {
    const sbd: string = form.value.destination;
    this.show = true;
    this.tripService.searchTrips(sbd)
    .subscribe(
      data => {(this.trips = data);
               console.log(this.trips);
      },
      err => console.error('Observer got an error:' + err)
    );
  }
// Change to new method inside of trip service
  searchByComp(form: NgForm) {
    const sbc: number = form.value;
    this.show = true;
    this.tripService.getTripsByCompanyId(sbc)
    .subscribe(
      data => {(this.trips = data);
               console.log('inside search by comp');
               console.log(this.trips);
      },
      err => console.error('Observer got an error:' + err)
    );
  }

  showDetailById(id: number) {
    this.tripService.getTrip(id);
    this.router.navigateByUrl('detail/id/' + id);

  }
}
