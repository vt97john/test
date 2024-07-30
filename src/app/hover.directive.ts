import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit{

  @Input() onColor: string = 'lightyellow';
  @Input() offColor: string = 'white';

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    
    // this.element.nativeElement.style.backgroundColor = this.color;
    
    // this.renderer.listen(this.element.nativeElement, 'mouseover', () => {
    //   this.element.nativeElement.style.backgroundColor = this.color;
    // });
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = this.onColor;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = this.offColor;
  }
}
