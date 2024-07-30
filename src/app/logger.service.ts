import { Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoggerService {

  constructor() { 
    //console.log('#######LoggerService initialized ...');
  }

  log(message: string){
    console.log(message);
  }
}
