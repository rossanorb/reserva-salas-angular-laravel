import { Component } from '@angular/core';
import { User } from '../models/users';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users.component.css', './users-new.component.css']
})

export class UsersNewComponent {

    user: User = {
        name: '',
        email: '',
        password: '',
        data: '',
        confirm_password: ''
    };

    form_erro_password = false;
    form_erro_email = false;
    form_erro_email_message = '';

    constructor(
        private httpService: UserService,
        private toastService: ToastService,
        private router: Router
    ) {}

    save() {
        this.httpService.resource('users')
            .save(this.user)
            .then( (data) => {
                console.log(data);

                if (data.code && data.code === 10) {
                    this.form_erro_email_message = data.description;
                    this.form_erro_email = true;
                } else {
                    this.form_erro_email = false;
                    this.router.navigate(['/users']);
                }

            })
            .catch((error: any) => {
                console.log('toast');
                this.toastService.message({
                    status: 'error',
                    message: 'Erro: não foi possível criar usuário'
                });

                this.form_erro_email = false;
                if ( error.status === 422 ) {
                    const mensagem = JSON.parse( error._body );
                    if (mensagem.code === 10) {
                        this.form_erro_email_message = mensagem.description[0];
                        this.form_erro_email = true;
                    }
                }
            });
    }

    confirm() {
        if (  this.user.password !== this.user.confirm_password || this.user.password.length === 0  ) {
            this.form_erro_password = true;
        } else {
            this.form_erro_password = false;
        }
    }

    dateChange(event: any) { // without type info
         console.log(event);
    }

}
