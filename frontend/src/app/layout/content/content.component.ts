import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    
  }

  @HostListener('resize')
  moveResize(){
    if (this.element.nativeElement){}
  }

}
