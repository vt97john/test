import { Component, Inject, Optional } from '@angular/core';
import { LoggerService } from './logger.service';
import {localStorageToken} from './localstorage.token';
import { InitService } from './init.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hotel';
  role = 'Admin';
  currentUser = 'None';

  /*Optional decorator is used to inject a service that may not exist
  we are gettig the service from container component if it exists*/
  constructor(@Optional() private loggerService: LoggerService, 
    //using a data provider to access local storage
    @Inject(localStorageToken) private LocalStorage: Storage, private initService: InitService,
      private router : Router) { 
    //console.log('CONFIG CONFIG CONFIG ' + initService.config.apiVersion + ' ' + initService.config.year);
    
  }

  ngOnInit() {
    //this.loggerService?.log('****AppComponent: ngOnInit, loggerService call!!!!');// '?' skip service if it doesn't exist
    this.LocalStorage.setItem('name', 'Hotel California');
    this.router.events.subscribe((event) => {
      //console.log('Router event: ' + event);
    });
  }

  /*To load child / children component(s) dynamically, we could use 
  @ViewChild / @ViewChildren and  ViewContainerRef*/
}
