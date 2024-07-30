import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Room } from '../room';
import { share, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomsService {

  rooms: Room[] = [];
  //'value provider' for the AppConfig 
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
              private http: HttpClient) {
  }

  getRooms() {
    //console.log('~~~~~~~~~~Getting rooms from API...');
    return this.http.get<Room[]>('api/rooms');
  }
 
  /*Here we use RXJS to create a property that is a stream.  It will give us
  more options to manipulate the stream.  shareReplay(1) caches rooms*/ 
  getRooms$ = this.http.get<Room[]>('api/rooms').pipe(
      shareReplay(1)
    );
  

  addRoom(room: Room) {
    return this.http.post<Room[]>('api/rooms', room);
  }

  editRoom(room: Room) {
    return this.http.put('api/rooms/${room.roomNumber}', room);
  }

  deleteRoom(roomNumber: string) {
    return this.http.delete<Room[]>(`api/rooms/${roomNumber}`);
  } 
  
  getPhotos(){
    const request = new HttpRequest(
      'GET', 
      'https://jsonplaceholder.typicode.com/photos',
      {reportProgress: true}
    );
    return this.http.request(request);
  }

}


