import { AfterViewInit, Component, DoCheck, OnInit, ViewChild, AfterViewChecked, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCounts } from './roomcounts';
import { Room } from './room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  //standalone: true,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  //imports: [CommonModule],
})

export class RoomsComponent implements DoCheck, OnInit, AfterViewInit, AfterViewChecked {
  hotelName = 'Hotel California';  
  numberOfRooms = 5;
  hideRooms = false;
  roomCounts: RoomCounts = {
    totalRooms: 0,
    availableRooms: 0,
    bookedRooms: 0
  }
  roomsArray: Room[] = [];
  totalBytes = 0;

  /*Subscription is a type in RxJS.  It represents a disposable resource, usually the execution of an Observable.
  It has one important method called unsubscribe.  You can call unsubscribe (in ngDestroy()) to cancel the execution of an Observable.*/
  subscription !: Subscription; 
  error$ = new Subject<string>; //Subject is a type in RxJS.  It is a special type of Observable that allows values to be multicasted to many Observers.
  getError$ = this.error$.asObservable(); //asObservable() is a method that returns an Observable.  It is used to hide the Subject from code that should only be publishing values.
  getRooms$ = this.roomsService.getRooms$.pipe( //this is a stream of rooms.  We can subscribe to it in ngOnInit.
    catchError(error => { //normally we'll do this in service to avoid change detection issues.  But for demo, we'll do it here.
      console.log('!!!!!!!!!!!!!! Error fetching rooms:', error);
      this.error$.next(error.message);
      return [];  
    })
  ); 

  priceFilter: FormControl = new FormControl(0);
filter: any;

  //constructor is where we inject services. Better than instantiating a class directly
  //also, remember not to access service directly in template
  constructor(private roomsService: RoomsService, private cdr: ChangeDetectorRef, private configService: ConfigService) { }

  updateTitle() {
    this.headerComponent.title = 'Rooms View';
    this.cdr.detectChanges(); // Manually trigger change detection because we are updating a property of a child component
  }
  
  @ViewChild(HeaderComponent)headerComponent!: HeaderComponent; //ViewChild is used to get a reference to a child component.
                                                                //A new instnace of HeaderComponent is created and injected into the headerComponent property.
                                                                //adding {static: true} means that the component is available in ngOnInit.  If false, it would be available in ngAfterViewInit.
  ngAfterViewInit(): void { //the purpose of ngAfterViewInit is to perform initialization after Angular has fully initialized a component's view.
       
  }
  ngAfterContentInit(): void {
    
  }
  ngAfterViewChecked(): void { //the purpose of ngAfterViewChecked is to perform operations after Angular checks the component's view.
     
  }
  
  /*ngOnInit is where we initialize the component.  Its a lifecycle hook.
  Other hooks include ngOnChanges, ngDoCheck, ngAfterContentInit, ngAfterContentChecked, 
  ngAfterViewInit, ngAfterViewChecked, ngOnDestroy*/
  ngOnInit(): void { 

    //Angular uses RxJS Observables to handle asynchronous operations. 
    //Its a pushlisher-subscriber pattern instead of a pull-based pattern.
    //In other words, its reactive programming.
    this.subscription = this.getRooms$.subscribe(rooms => {
      this.roomsArray = rooms;
      this.roomCounts = {
        totalRooms: this.numberOfRooms,
        availableRooms:  rooms.length,
        bookedRooms: rooms.filter(r => r.checkinTime < new Date() && r.checkoutTime > new Date()).length
      };
      console.log('^^^^^^^^^^^^^^^^^Rooms fetched from API:', rooms.length);  //this will print the rooms array
      // console.log('^^^^^^^^^^^^^^^^^ totalRooms:', this.roomCounts.totalRooms);  //this will print the rooms array
    });
    this.playWithObservables(); //Not for app.  Just to demo Observables/ streams that underly Angular
  };
  
  //Here we show how to use Observables from RxJS. Not needed for our app. Usually
  //in app you would just use HttpClient.
  playWithObservables() {
  
    let stream = new Observable(observer => {
      observer.next('Foo 1');
      observer.next('Foo 2');
      observer.next('Foo 3');
      observer.complete();
    });

    stream.subscribe({
      next: value => console.log('XXXXXXXXXXXX Received value:', value),
      error: error => console.error('XXXXXXXXXXXX Error:', error),
      complete: () => console.log('XXXXXXXXXXXX Completed')
    })
    stream.subscribe(value => {
      //console.log('YYYYYYYYYYYYYY Received value:', value);
    });
  }

  
  toggle(){
    this.hideRooms =!this.hideRooms;
  }

  loadPhotos(){
    //we'll do it many times to show UI updating as more bytes come in
    for (let i = 0; i <100 ; i++) {
      this.roomsService.getPhotos().subscribe((event) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log(`Http Request Sent!`);
            break;
          case HttpEventType.ResponseHeader:
            console.log(`Response Header Received!`);
            break;
          case HttpEventType.DownloadProgress:
            this.totalBytes += event.loaded;
            console.log(`!!!!!!!! Download Progress: + ${event.loaded} bytes`);
            break;
          case HttpEventType.Response:
            break;
          default:
        }
      });
    }
  }

  ngDoCheck(): void { //The purpose of ngDoCheck is to detect and act upon changes that Angular doesn't catch on its own. 
    //console.log('RoomsComponent: ngDoCheck');
  }

  selectRoom(room: Room) {
    console.log('Room Selected', room);
  }

  addRoom() {
    const room: Room = {
      roomNumber: '5',
      roomType: 'Penthouse',
      amenities: 'TV, Air Conditioning',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      checkinTime: new Date(2021, 1, 1),
      checkoutTime: new Date(2021, 2, 1),
      rating: 5
    };
  
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomCounts.availableRooms++; 
      this.roomsArray = data; //backend returns array instead of just the added room because its just for demo.
      //keep in mind that if we just push a room onto array, it might not trigger change detection.
      //so instead you might use split operator to create a new array like this: this.roomsArray = [...this.roomsArray, room];
      //console.log('Room added successfully', data);
    });
  }
  editRoom() {
    const room: Room = {
      roomNumber: '3',
      roomType: 'Penthouse',
      amenities: 'TV, Air Conditioning',
      price: 501,
      photos: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      checkinTime: new Date(2021, 1, 1),
      checkoutTime: new Date(2021, 2, 1),
      rating: 5
    }; 
    this.roomsService.editRoom(room).subscribe((data) => {
      //next we iterate through roomsArray and update the edited room
      let indexToUpdate = this.roomsArray.findIndex(aRoom => aRoom.roomNumber === room.roomNumber);
      this.roomsArray[indexToUpdate] = room;
      this.roomsArray = Object.assign([], this.roomsArray);
    });
  }
  deleteRoom() {
    if(this.roomsArray.filter(r => r.roomNumber === '1').length > 0) {
      this.roomsService.deleteRoom('1').subscribe((data) => {
        this.roomCounts.availableRooms--; 
        this.roomsArray = data; //backend returns data array instead of void because its just for demo.
      });
    }
  }
  //free up resources
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}


 