import { Component, OnInit } from '@angular/core';
import { Companies } from 'src/app/models/companies';
import { Trip } from 'src/app/models/trip';
import { CompaniesService } from 'src/app/services/companies.service';
import { TripService } from 'src/app/services/trip.service';
import { NgForm } from '@angular/forms';

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
  addNewTrip = null;
  eC = null;
  eT = null;

  start = null;
  
  


  // CONTRRUCTOR-------
  constructor(private compServ : CompaniesService, private tripServ : TripService) { }

  // METHODS ----------

  ngOnInit() {
    this.start = true;
    // this.loadCompany();
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
        console.error('error in creating trip');}
    )
    this.addNewTrip = false;
    this.ngOnInit();
  }
  setEditTrip(trip: Trip) {
    this.eT = true;
    this.start = false;
    this.companies.editTrip = Object.assign({}, this.selected);
  }

  updateTrip(form: NgForm) {
    const updateTrip = form.value;
    this.tripServ.updateTrip(updateTrip).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in update trip');}
    )
    this.eT = false;
    this.ngOnInit();
  }
  deleteTrip(id: number) {
    this.tripServ.deleteTrip(id).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in deleting trip');}
    )
    this.tripselector = false;
    this.ngOnInit();
  }
  updateCompany(form: NgForm) {
    const updateCompany = form.value;
    this.compServ.updateCompanies(updateCompany).subscribe(
      data => {
        this.ngOnInit();
      },
      err => {
        console.error('error in updating company');}
    )
    this.eC = false;
    this.ngOnInit();
 }



  // deleteVehicle(id: number) { }

  // addNewVehicle(vehicle: any) { }

  // updateVehicle(id: number) { }

}
