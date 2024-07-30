import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Room } from '../rooms/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush })//Parent won't check for changes in child component unless 
                                                    //its sending input to child component.  This is to improve performance.
                                                    //only works if child doersn't alter input.
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: Room[] = []; //receive input from parent component.  Child is dumb and parent is smart.
  @Input() title = ''
  @Output() roomSelected = new EventEmitter<Room>(); //send output to parent component
  @Input() price = 0
  
  constructor() {}
  
  ngOnDestroy(): void { //could be useful for unsubscribing from observables or other clean up
    //console.log('RoomsListComponent: ngOnDestroy');
  }
;
 
  ngOnChanges(changes : SimpleChanges) { //do something when input array changes
    //console.log('RoomsListComponent: ngOnChanges', changes);
  }
  ngOnInit() {
    //console.log('RoomsListComponent: ngOnInit');
  }
  selectRoom(room: Room) {
      this.roomSelected.emit(room); //sending back to parent component
    }
}
