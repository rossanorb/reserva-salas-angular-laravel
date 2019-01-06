import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';

import { Reservations } from '../models/reservations';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';
import { DialogService } from '../services/dialog.service';
import { Room } from '../Interfaces/room';


import * as Materialize from 'angular2-materialize';


// declare var $: any; // or import * as $ from 'jquery';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, AfterViewInit  {

  public reservations: Object = Reservations;

  public reservation = {
    date_in: '',
    date_out: '',
    time_in: '',
    time_out: ''
  };

/*
  public rooms: Object = {
    data: []
  };
*/

  public rooms: Room = {
    name: '',
    number: null
  };


  materializeParams = [{
    format: 'dd/mm/yyyy',
    today: 'Hoje',
    clear: 'limpar',
    monthsFull: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'],
    weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    close: 'OK'
  }];

  materializeTimeParams = [{
    twelvehour: false
  }];

  selectedRoom = '';

  constructor(
    private httpService: ReservationService,
    private dialogService: DialogService,
    private httpRoomService: RoomService
  ) {
    const date = new Date();
    const today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    this.reservationsMades(today);
  }

  ngOnInit(): void {
    this.list();
  }

  ngAfterViewInit() {

  }

  valid() {
    const date_in  = new Date(this.formatDate(this.reservation.date_in) + ' ' + this.reservation.time_in);
    const date_out = new Date( this.formatDate(this.reservation.date_out) + ' ' + this.reservation.time_out);

    if ( date_in > date_out) {
      Materialize.toast('Horário de entrada não pode ser maior do que o de saída !', 2000);
      return false;
    } else {
      return true;
    }
  }

  reservar() {

    if ( this.valid() ) {
      const data: Object = {
        date_out: this.formatDate(this.reservation.date_out) + ' ' + this.reservation.time_out + ':00',
        date_in: this.formatDate(this.reservation.date_in) + ' ' + this.reservation.time_in + ':00',
        rooms_id: this.selectedRoom
      };

      this.httpService.resource('reservations').make(data)
      .then(
        (res) => {
          this.clearTimeTable();
          this.reservationsMades( this.formatDateIn(this.reservation.date_in) );
          Materialize.toast('Horário reservado com sucesso!', 2000);
        }
      )
      .catch(
        (error: any) => {
          const result = JSON.parse( error._body );
          Materialize.toast(result.description, 2000);
        }
      );
    }
  }

  public changeDate(date: string) {
    if (date) {
      this.clearTimeTable();
      this.reservationsMades(this.formatDateIn(date));
    }
  }

  private list() {
    this.httpRoomService
      .resource('room')
      .list()
      .subscribe( res => this.rooms = res );
  }

  private formatDate(date: String): string {
    return date.substr(6, 10) + '-' + date.substr(3, 2) + '-' + date.substr(0, 2);
  }

  private formatDateIn(date: string): string {
    return date.substr(0, 2) + '-' + date.substr(3, 2) + '-' + date.substr(6, 10);
  }

  public clearTimeTable() {
    /* hiding all icons delete */
    const htmlElements: Array<Element> = Array.from( document.querySelectorAll('.delete') );
    htmlElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.visibility = 'hidden';
      } else {
          throw new Error('element delete ' + el + ' in document');
      }
    });

    for (let id = 1; id <= 24; id++) {
        const parent: any = document.getElementById('hr-bar-' + id );
        let nodes: number = document.getElementById('hr-bar-' + id ).childElementCount;

        while (nodes >= 0) {
          const child = parent.children[nodes];
          if (child) {
            parent.removeChild(child);
          }
          nodes--;
        }
    }

  }

  reservationsMades(date: string) {
    this.httpService.resource('reservations/mades')
      .schedules(date)
      .then( (result) => {
        this.reservations = result;
        const hours: Array<any> = this.getHours(result);
        this.fillTable(hours);
      });
  }

  private getHours(param: any) {
    let hours = [];

    for (let i = 0; i < param.length; i++ ) {
      const date_in: number = param[i].date_in.split(' ')[1].replace(':', '').substring(0, 4);
      const date_out: number = param[i].date_out.split(' ')[1].replace(':', '').substring(0, 4);
      hours.push({
        date_in: date_in,
        date_out: date_out,
        id: param[i].id,
        owner: param[i].user.email,
        label: param[i].date_in.split(' ')[1].substring(0, 5) + ' - ' + param[i].date_out.split(' ')[1].substring(0, 5),
        room: param[i].room.name
      });
    }

    hours = this.adjustHoursToTableTime(hours);

    // sort by date_in
    hours.sort(function (a, b) {
        return a.date_in - b.date_in;
    });

    return hours;

  }

  private adjustHoursToTableTime(hours: Array<any>): Array<any> {
    const arr = [];
    for ( let i = 0; i < hours.length; i++ ) {
      const date_out: number = hours[i].date_out.substring(0, 2);
      const date_in: number =  hours[i].date_in.substring(0, 2);

      let dtin = date_in;

      while (dtin <= date_out) {

        if ( date_in == dtin) {
            let dt: string;

            // quando dentro de um horario
            if (dtin == date_out ) {
              const dto = hours[i].date_out.substring(2, 4);
              dt =  (Number(dtin) ) < 10 ?  '0' + (Number(dtin)  ) + dto : (Number(dtin) ) + dto;
            } else {
              dt =  (Number(dtin) + 1 ) < 10 ?  '0' + (Number(dtin) + 1 ) + '00' : (Number(dtin) + 1) + '00';
            }

            arr.push({ date_in: hours[i].date_in, date_out: dt,
              id: hours[i].id, owner: hours[i].owner, label: hours[i].label, room: hours[i].room
            });

        } else if ( dtin == date_out ) {
          if ( hours[i].date_out.substring(2, 4) != '00' ) {
            const dt = dtin < 10 ?  '0' + dtin  + '00' : dtin + '00';
            arr.push({ date_in: dt, date_out:  hours[i].date_out,
              id: hours[i].id, owner: hours[i].owner, label: hours[i].label, room: hours[i].room
            });
          }

        } else {
          const dti = dtin < 10 ?  '0' + dtin  + '00' : dtin + '00';
          const dto =  (Number(dtin) + 1) < 10 ?  '0' + (Number(dtin) + 1) + '00' : (Number(dtin) + 1) + '00';
          arr.push({ date_in: dti + '00', date_out: dto,
           id: hours[i].id, owner: hours[i].owner, label: hours[i].label, room: hours[i].room
          });
        }

        dtin++;
      }
    }

    hours = arr;
    // console.log(hours);

    return hours;
  }

  private fillTable (hours: Array<any>): void {
    let el: any;
    let last: number;
    let margintop: string;
    let controle = 0;
    let id: number;
    const token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};


    hours.forEach( (element, index) => {
        id = element.date_in.substring(0, 2);
        const isOwner: boolean = token.user ===  element.owner ? true : false;

        el = document.getElementById('hr-bar-' + Number(id) );

        if (!el) { return false; }
        last = element.date_out.substring(2, 4);

        controle = this.getPosition(element, hours, id);

        const div = document.createElement('div');
        const marginleft = this.getMarginLeft(element, last, controle);
        const width = this.getWith(element);


        if ( controle > 0) {
          margintop = 'margin-top: -30px;';
        } else {
          margintop = '';
        }

        div.setAttribute('style', 'font-size: 0.6em; text-align: center; padding-top: 2%;' +
        'background-color: ' + ( isOwner ? '#86f9ed' : '#ffa012') + '; position:relative;' +
        'height:30px; width:' + width + '; margin-left:' + marginleft + ';' + margintop );

        if (parseInt(width, 10) > 15) {
          div.appendChild(document.createTextNode( element.room ));
        }

        if (isOwner) {
              const btnDelete = el.previousElementSibling.firstElementChild.lastElementChild;
              btnDelete.style.visibility = 'visible';
              btnDelete.addEventListener('click', () => {
                this.delete(element.id);

              });
        }

        el.appendChild(div);
    });
  }

  private  getPosition(element: any, hours: Array<any>, id: number): number {

    let position = -1;
    let idx: number;

    for (let i = 0; i < hours.length; i++) {
      idx = hours[i].date_in.substring(0, 2);
      if ( idx === id) {
        position++;
        if ( hours[i].date_in === element.date_in) {
          i = hours.length;
        }
      }
    }

    return position;
  }

  private getMarginLeft(element: any, last: number, index: number): string {
    let marginleft: number;

    if (index === 0) {
      marginleft =  element.date_in.substring(2, 4) * 1.6666666 ;

    } else {

      if (element.date_out.substring(2, 4) === '00') {
        marginleft = 60 * 1.6666666;
      }

      marginleft = ( element.date_in.substring(2, 4) - last ) * 1.6666666;
    }

    return ( marginleft + '%' );
  }

  private getWith(element: any): string {
    let date_out = element.date_out.substring(2, 4);
    const date_in = element.date_in.substring(2, 4);

    if (element.date_out.substring(2, 4) === '00') {
      date_out = 60;
    }

    const width = (date_out - element.date_in.substring(2, 4)) * 1.6666666;

    return width + '%';
  }

  delete(id: number) {
    this.dialogService.activate('Você tem certeza que deseja excluir esta reserva ?', 'Confirmação')
      .then(confirmed => {
        if (confirmed === true) {
          this.httpService.resource('reservations').delete(id)
            .then((res) => {
              if (this.reservation.date_in) {
                this.changeDate(this.reservation.date_in);
              } else {
                location.reload();
              }
            })
            .catch((error: any) => {
              console.log(error._body);
            });
        }
      });
  }

}
