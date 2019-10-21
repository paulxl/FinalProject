import { MessageService } from "./services/message.service";
import { CompaniesService } from "./services/companies.service";
import { TripService } from "./services/trip.service";
// import { ProviderService } from './services/provider.service';
import { UserService } from "./services/user.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

import { TravelerService } from "./services/traveler.service";
import { UserListComponent } from "./components/user-list/user-list.component";
import { TravelerListComponent } from "./components/traveler-list/traveler-list.component";
import { TripListComponent } from "./components/trip-list/trip-list.component";
import { HttpClientModule } from "@angular/common/http";
import { MainComponent } from "./components/main/main.component";
import { RegisterComponent } from "./components/register/register.component";

import { SearchComponent } from "./components/search/search.component";
import { DetailsComponent } from "./components/details/details.component";
import { CompaniesComponent } from "./components/companies/companies.component";

import { TravelerComponent } from "./components/traveler/traveler.component";

import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { FormsModule } from "@angular/forms";
import { ShowAllComponent } from './components/show-all/show-all.component';
import { AccordianComponent } from './components/show-all/accordian/accordian.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserListComponent,
    TravelerListComponent,
    TripListComponent,
    MainComponent,
    RegisterComponent,
    SearchComponent,
    DetailsComponent,
    CompaniesComponent,
    TravelerComponent,
    LoginComponent,
    LogoutComponent,
    ShowAllComponent,
    AccordianComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],

  providers: [TravelerService, UserService, CompaniesService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule {}
