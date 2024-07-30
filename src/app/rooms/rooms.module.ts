import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from '../rooms-list/rooms-list.component';
import { RoomsService } from './services/rooms.service';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RoomsComponent } from './rooms.component';
import { RouteConfigToken } from '../services/routeConfig.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {
      provide: RoomsService
    },
    {
      provide: RouteConfigToken,
      useValue: {
        title: 'Yay!'
      }
    }
  ]
})
export class RoomsModule { }
