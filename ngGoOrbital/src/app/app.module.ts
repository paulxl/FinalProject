import { TripService } from './services/trip.service';
import { ProviderService } from './services/provider.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TravelerService } from './services/traveler.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { TravelerListComponent } from './components/traveler-list/traveler-list.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserListComponent,
    TravelerListComponent,
    TripListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TravelerService, UserService, ProviderService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
