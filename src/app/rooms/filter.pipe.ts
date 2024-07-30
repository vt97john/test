import { Pipe, PipeTransform } from '@angular/core';
import { Room } from './room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: Room[], price: number): Room[] {
    return rooms.filter(room => room.price > price); //filter() is a method that creates a new array with all elements 
                                                      //that pass the test implemented by the provided function.
  }

}
