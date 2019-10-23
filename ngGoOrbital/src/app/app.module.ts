import { AuthService } from "src/app/services/auth.service";
import { MessageService } from "./services/message.service";
import { CompaniesService } from "./services/companies.service";
import { TripService } from "./services/trip.service";
// import { ProviderService } from './services/provider.service';

import { UserService } from "./services/user.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

import { TravelerService } from "./services/traveler.service";
import { UserListComponent } from "./components/user-list/user-list.component";
import { TravelerListComponent } from "./components/traveler-list/traveler-list.component";
import { TripListComponent } from "./components/trip-list/trip-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MainComponent } from "./components/main/main.component";
import { RegisterComponent } from "./components/register/register.component";
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { CompaniesComponent } from './components/companies/companies.component';

import { TravelerComponent } from './components/traveler/traveler.component';


import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './template/footer/footer.component';
import { ShowAllComponent } from './components/show-all/show-all.component';
import { AccordianComponent } from './components/show-all/accordian/accordian.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    DetailsComponent,
    FooterComponent,
    MainComponent,
    NavBarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    SearchComponent,
    ShowAllComponent,
    TripListComponent,
    TravelerListComponent,
    TravelerComponent,
    UserListComponent,
    AccordianComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, NgbModule, BrowserAnimationsModule,
 
  ],

  providers: [
    TravelerService,
    UserService,
    CompaniesService,
    TripService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
