/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOrderlist]'
})
export class OrderlistDirective {

  constructor(private el: ElementRef) {}

  @Input() order: string;
  @Output() getOrder = new EventEmitter();

  status = false;
  icons = {
    false: 'arrow_drop_down',
    true: 'arrow_drop_up'
  };

  @HostListener('click') onClick() {
    this.status = !this.status;
    const idx: string = String(this.status);
    const order: string = this.icons[ idx ] === 'arrow_drop_down' ? 'asc' : 'desc';
    const column = this.order.split(',')[0];

    this.el.nativeElement.innerHTML =  this.icons[ idx ];
    this.getOrder.emit(column + ',' + order);
  }

}
