import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.css'
})
export class RoomsBookingComponent {
  roomNumber: any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    /*this.router.params.subscribe(params => { 
            this.roomNumber = params['roomNumber'];
    });

    //alternatively, you can use snapshot or paramMap because params is an Observable so 
    //you can use subscribe or pipe for puroose of getting the value of the parameter that might change
    this.roomNumber = this.router.snapshot.params['roomNumber'];*/
    this.router.paramMap.pipe(map(params => params.get('roomNumber'))).subscribe(roomNumber => this.roomNumber = roomNumber);
  } 

}
