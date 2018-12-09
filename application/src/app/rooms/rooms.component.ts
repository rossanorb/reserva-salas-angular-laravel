import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  public rooms: Object = {
    data: []
  };

  constructor(
    private httpService: RoomService,
    private dialogService: DialogService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.httpService.resource('room')
      .list()
      .subscribe( res => this.rooms = res);
  }

  pageChanged(data: Object) {
    this.rooms = data;
  }

  delete(id: number) {
    this.dialogService.activate('Você tem certeza que deseja excluir esta sala ?', 'Confirmação')
      .then(confirmed => {
        if (confirmed === true) {
          this.httpService.resource('room').delete(id)
            .then((res) => {
              this.list();
            })
            .catch((error: any) => {
              console.log(error._body);
            });
        }
      });
  }

}
