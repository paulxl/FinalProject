import { Provider } from './../../models/provider';
import { Component, OnInit } from '@angular/core';
import { Traveler } from 'src/app/models/traveler';
import { Companies} from 'src/app/models/companies'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Fields
  newCompany : Companies = new Companies;
  newTraveler : Traveler = new Traveler;

  // Contructor

  constructor() { }

  // Methods

  ngOnInit() {
  }


}
