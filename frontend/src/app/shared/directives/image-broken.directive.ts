import { Directive, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appImageBroken]'
})
export class ImageBrokenDirective implements OnChanges {

  constructor(private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.element)
  }

  @HostListener('error')
  replace() {
    const element = this.element.nativeElement;
    element.src = "./assets/notfound.jpg"
  }

}
