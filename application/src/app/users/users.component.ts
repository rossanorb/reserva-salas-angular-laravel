import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: Object = {
    data: []
  };

  order = 'name,asc';

  constructor(
    private httpService: UserService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.httpService
      .resource('users')
      .list()
      .then((res) => {
        this.users = res;
      });
  }

  pageChanged(data: Object) {
    this.users = data;
  }

  setOrder(value: string) {
    this.order = value;
  }

  delete(id: number) {
    this.dialogService.activate('Você tem certeza que deseja excluir este usuário ?', 'Confirmação')
      .then(confirmed => {
        if (confirmed === true) {
          this.httpService.resource('users').delete(id)
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
