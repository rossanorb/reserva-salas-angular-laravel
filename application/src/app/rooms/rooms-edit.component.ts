import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-room-edit',
    templateUrl: './rooms-edit.component.html',
    styleUrls: ['./rooms-form.component.css']
})

export class RoomsEditComponent implements OnInit {

    public room: Object = {Room};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private httpService: RoomService,
        private toastService: ToastService
    ) {}

    ngOnInit (): void {
        this.route.params.subscribe( (params: any) => {
            this.edit(params.id);
        });
    }

    private edit(id: number) {
        this.httpService.resource('room')
        .show(id)
        .then( (result) => {
            this.room = result;
        });
    }

    save(id: number) {
        console.log('save');
        this.httpService.resource('room')
        .update(id, this.room)
        .then(
            (res) => {
                this.toastService.message({
                    status: 'success',
                    message: 'Sucesso: dados alterados'
                 });
                this.router.navigate(['/room/edit/' + id]);
            }
        )
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
