import { Component } from '@angular/core';
import { Room } from '../room';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.css'
})
export class RoomsAddComponent {

  room : Room = {
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 5
  };
  successMessage = '';
  errorMessage = '';

  constructor(private roomsService: RoomsService) {}

  addRoom(roomForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => { 
      this.successMessage = 'Room added successfully';
      roomForm.resetForm();
    });  
    
  }
}
    
  



