import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  //"any" means we will have one instance of the service for each module that imports it. 
  //This is useful for lazy loaded modules.  "root" would create a single instance for the entire app.
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken:  RouteConfig ) { 
    console.log('>>>>>>>>>>>>>>> ConfigService created');
    console.log(this.configToken);
  }
}
