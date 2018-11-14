import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.eventToast.subscribe(
      event => this.message(event)
    );
  }

  private setStatus(snackbar) {
    switch ( this.toastService.getStatus()) {
      case 'success': snackbar.style.backgroundColor = 'green'; break;
      case 'error': snackbar.style.backgroundColor = 'red'; break;
    }
  }

  message( param: any) {
    const snackbar = document.getElementById('snackbar');
    snackbar.innerHTML = this.toastService.getMessage();
    snackbar.className = 'show';
    this.setStatus(snackbar);

    setTimeout(function() {
      snackbar.className = snackbar.className.replace('show', '');
      }, 3000);
  }

}
