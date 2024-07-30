import { TestBed } from '@angular/core/testing';
import { RoomsService } from './rooms.service';

describe('RoomsService', () => {
  let service: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a method called getRooms', () => {
    expect(service.getRooms).toBeDefined();
  });
  it('should have a method called getPhotos', () => {
    expect(service.getPhotos).toBeDefined();
  });    
  it('should have a method called addRoom', () => {
    expect(service.addRoom).toBeDefined();
  });
  it('should have a method called updateRoom', () => {
    expect(service.editRoom).toBeDefined();
  });
});
