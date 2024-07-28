import { ChangeDetectorRef, Component, Host } from '@angular/core';

import { RoomsService } from '../rooms/services/rooms.service';
import { ConfigService } from '../services/config.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [RoomsService], //creates root injector for the service, so it is available to the component and its children
})
export class HeaderComponent {

  title: string = '';

  constructor(private configService: ConfigService) { 
    
    
  } 

}
