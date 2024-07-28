import { AfterContentInit, Component, ContentChild, Host, OnDestroy } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
//import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
  //providers: [RoomsService], //creates root injector for the service, 
                            //so it is available to the component and its children
})
export class ContainerComponent implements AfterContentInit {
  
  /*@Host will provide the service to child components
  rather than allowing app to search upwards for the service
  in the injector tree*/
  //constructor(@Host() private roomsService: RoomsService) { } 
  //constructor(private roomsService: RoomsService) { }

  /*next we show we can access a component at runtime.  
  the purpose of @ContentChild is to access the content 
  of the child component. We change the initial employee 
  from John to Janename.  But usally @Input/@Output is preferred*/
  @ContentChild(EmployeeComponent) employee !: EmployeeComponent;
  ngAfterContentInit(): void {
    this.employee.employeeName = 'Jane Doe';
  }

}
