import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  public modal;

  ngOnInit() {
    this.modal = document.getElementById('modal');
    console.log(this.modal);
  }

  openModal() {
    this.modal.style.display = 'block';
  }

}
