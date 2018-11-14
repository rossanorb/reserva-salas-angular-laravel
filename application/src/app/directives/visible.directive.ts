import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appVisible]'
})
export class VisibleDirective {

  public _el: ElementRef;

  constructor(private el: ElementRef) {
    this._el = el;
   }

  @HostListener('click')
  onClick() {
     this._el.nativeElement.style.display = 'none';
  }

}
