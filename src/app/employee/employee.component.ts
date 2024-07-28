import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service'; // 
import { Room } from '../rooms/room';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  employeeName = 'John Doe';
  rooms: Room[] = []; 

  constructor(private roomsService : RoomsService) { }
  ngOnInit(): void {
    this.roomsService.getRooms$.subscribe(rooms => {
      this.rooms = rooms;});
      console.log('################Rooms: ', this.rooms);
  }
  
}
