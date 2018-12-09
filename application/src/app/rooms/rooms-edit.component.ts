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
        .subscribe( (result) => {
            this.room = result;
        });
    }

    save(id: number) {
        this.httpService.resource('room')
            .update(id, this.room)
            .subscribe(
                (res: any) => {
                    this.toastService.message({
                        status: 'success',
                        message: 'Sucesso: dados alterados'
                     });
                    this.router.navigate(['/rooms/edit/' + id]);
                },
                (error: any) => {
                    const result = JSON.parse( error._body );
                    let mensagem = 'Detalhes:<br />';

                    result.description.forEach(element => {
                      mensagem += element + '<br />';
                    });

                    this.toastService.message({
                        status: 'error',
                        message: 'Erro: não foi possível atualizar os dados' + mensagem
                    });
                }
            );
    }
}
