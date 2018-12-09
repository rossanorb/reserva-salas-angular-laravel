import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../Interfaces/room';
import { RoomService } from '../services/room.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-rooms-new',
  templateUrl: './rooms-new.component.html',
  styleUrls: ['./rooms-form.component.css']
})
export class RoomsNewComponent {

  room: Room = {
    name: '',
    number: null
  };

  valid_number: boolean;

  constructor(
    private router: Router,
    private httpService: RoomService,
    private toastService: ToastService,
  ) { }


  validateNumber() {
    if (isNaN(this.room.number)) {
      this.valid_number = true;
    } else {
      this.valid_number = false;
    }
  }

  public save() {
    this.httpService.resource('room')
      .save(this.room)
      .subscribe(
          (data: any) => {
          this.router.navigate(['/rooms']);
          },
          (error: any) => {
            const result = JSON.parse(error._body);
            let mensagem = 'Detalhes:<br />';

            result.description.forEach(element => {
              mensagem += element + '<br />';
            });

            this.toastService.message({
              status: 'error',
              message: 'Erro: não foi possível criar nova sala<br />' + mensagem
            });
          }
      );
  }
}
