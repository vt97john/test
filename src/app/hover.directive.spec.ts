import { HoverDirective } from './hover.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('HoverDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let directive: HoverDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: new ElementRef(null) },
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setStyle']) }
      ]
    });

    elementRef = TestBed.inject(ElementRef);
    renderer = TestBed.inject(Renderer2);
    directive = new HoverDirective(elementRef, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  // Add more test cases here to verify the directive's behavior
});