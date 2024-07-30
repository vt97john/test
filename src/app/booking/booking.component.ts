import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { BookingService } from './booking.service';
import { merge, mergeMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Injector } from '@angular/core';


/*
  In this component we are deomonstrating the use of reactive forms in Angular. 
  These forms allow us to create complex forms with nested form groups and form arrays.
  Typescript code is used to create the form and the HTML template is used to render the form.
  The best time to use reactive forms is when we have complex forms with nested form groups and 
  form arrays.
*/

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  bookingForm!: FormGroup;
  //guests: any;

  constructor(private configService: ConfigService, private formBuilder: FormBuilder, 
    private bookingService: BookingService, private activatedRoute: ActivatedRoute,
    private injector: Injector) { }

  ngOnInit() {
    const roomNumber = this.activatedRoute.snapshot.params['roomNumber'];
    //console.log('TTTTTTTTTTTTT ' + roomNumber);
    this.bookingForm = this.formBuilder.group({
      roomId: new FormControl({ value: roomNumber, disabled: true }, {validators: [Validators.required]}), 
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: ['', [Validators.required, Validators.minLength(3)]],
      guestAddress: this.formBuilder.group({
        lineOne: [''],
        lineTwo: [''],
        guestCity: [''],
        guestState: [''],
        guestCountry: [''],
        guestZipCode: [''],
      }),
      tnc: ['', [Validators.requiredTrue]],  
      guests: this.formBuilder.array([
        this.formBuilder.group({
          guestName: [''],
          guestAge: new FormControl('')
        })
      ]),
    });
    this.loadBookingData(roomNumber);

    // this.bookingForm.valueChanges.subscribe((value) => {
    //   this.bookingService.bookRoom(value).subscribe((response) => { });
    // });

    /*
    This code below shows a awy to use reactive forms with observables.  We can do live updates to
    backend whenever user types anything in the form.  mergeMap is used to merge the form value changes.
    If we used switchMap instead of mergeMap, then the previous request would be cancelled and only the
    latest request would be sent to the backend. If we used exhaustMap, then the previous request would
    
    */
    this.bookingForm.valueChanges.pipe(mergeMap(data => this.bookingService.bookRoom(data))).subscribe((data) => {
      console.log(data);
    })
  }
  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
  }
  bookRoom() {
    this.bookingService.bookRoom(this.bookingForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  addGuest() {
    this.guests.push(this.formBuilder.group({
      guestName: [''],
      guestAge: new FormControl('')
    }));
  }
  removeGuest(index: number) {
    this.guests.removeAt(index);
  }
  addPassport() {
    this.bookingForm.addControl('passportNumber', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.contains('passportNumber')) {
      this.bookingForm.removeControl('passportNumber');
    }
  }
  loadBookingData(roomNumber: string) {
    this.bookingForm.patchValue({ //setValue requires all form controls to be set. Use patchValue if you want to set only a few form controls
      roomId: roomNumber,
      guestEmail: 'joe.shmoe@gmail.com',
      checkinDate: new Date(),
      checkoutDate: new Date(),
      bookingStatus: 'Confirmed',
      bookingAmount: 10000,
      bookingDate: new Date(),
      mobileNumber: '9999999999',
      guestName: 'John',
      guestAddress: {
        lineOne: 'line one',
        lineTwo: 'line two',
        guestCity: 'city',
        guestState: 'state',
        guestCountry: 'country',
        guestZipCode: '12345'
      },
      tnc: true,
      guests: [
        { guestName: 'Fred', guestAge: 30 },
        { guestName: 'Jane', guestAge: 25 }
      ]
    });
  }
}

