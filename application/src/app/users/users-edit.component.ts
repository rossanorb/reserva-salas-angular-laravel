import { Component, OnInit } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users.component.css', './users-edit.component.css']
})

export class UsersEditComponent implements OnInit {

    public user: Object = {User};
    public form_erro_password = false;
    public form_erro_email = false;
    public form_erro_email_message = '';

    constructor(
        private httpService: UserService,
        private toastService: ToastService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit (): void {
        this.route.params.subscribe((params: any) => {
            this.edit(params.id);
        }
        );
    }

    private edit(id: number) {
        this.httpService.resource('users')
        .show(id)
        .then((result) => {
            this.user = result;
        });
    }

    save(id: number) {
        this.httpService.resource('users')
        .update(id, this.user)
        .then((res) => {
         this.toastService.message({
                status: 'success',
                message: 'Sucesso: dados alterados'
             });
            this.router.navigate(['/users/edit/' + id]);
        })
        .catch(
            (error: any) => {
                const mensagem = JSON.parse( error._body );
                console.log(mensagem.message);
                this.toastService.message({
                    status: 'error',
                    message: 'Erro: não foi possível atualizar os dados'
                });
            }
        );
    }

}
