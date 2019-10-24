import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Companies } from 'src/app/models/companies';
import { Trip } from 'src/app/models/trip';
import { CompaniesService } from 'src/app/services/companies.service';
import { TripService } from 'src/app/services/trip.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  // FIELDS----------
  selected: Companies = null;
  editCompanies: Companies = null;
  companies: Companies;
  editTrip: Trip = null;
  tripselector = null;

  addTripNew = null;
  eC = null;
  eT = null;

  start = null;


  // CONTRRUCTOR-------
  constructor(
    private compServ: CompaniesService,
    private tripServ: TripService,
    private authServ: AuthService,
    private userServ: UserService
  ) {}

  // METHODS ----------

  ngOnInit() {
    this.start = true;

    this.reload();
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
    this.compServ.getCompanies(user.id).subscribe(
      good => {
        this.selected = good;
      },
      bad => {
        console.error(bad);
      }
    );
    this.start = true;
  }

  compInfo() {
    this.eC = true;
    this.editCompanies = Object.assign({}, this.selected);
  }

  addAnotherTrip(form: NgForm) {
    const addTrip = form.value;
    this.tripServ.addTrip(addTrip).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in creating trip'); }
    );
    this.addTripNew = false;
    this.ngOnInit();
  }

  setEditTrip(trip: Trip) {
    this.eT = true;
    // this.editTrip = Object.assign({}, this.selected);
    this.start = false;
  }

  updateTrip(form: NgForm) {
    const updateTrip = form.value;
    this.tripServ.updateTrip(updateTrip).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in update trip'); }
    );
    this.ngOnInit();
    this.eT = false;
  }
  deleteTrip(id: number) {
    this.tripServ.deleteTrip(id).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in deleting trip'); }
    );
    this.ngOnInit();
    this.tripselector = false;
  }
  updateCompany(form: NgForm) {
    const updateCompany = form.value;
    this.compServ.updateCompanies(updateCompany).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in updating company'); }
    );
    this.ngOnInit();
    this.eC = false;
 }



  // deleteVehicle(id: number) { }

  // addNewVehicle(vehicle: any) { }

  // updateVehicle(id: number) { }

}
