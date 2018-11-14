import { Component } from '@angular/core';

const breakpoint = 992;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  // private breakpoint: number = 992;

  constructor() { }

  public open() {
    document.getElementById('slide-out')
    .style.left = '300px';
  }

  public close() {
    document.getElementById('slide-out')
    .style.left = '0px';
    return false;
  }

  onResize(event) {
    const w = event.target.innerWidth;
    if (w > breakpoint) {
      this.close();
    }
  }

}
