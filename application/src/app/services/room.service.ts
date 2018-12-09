import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Room } from './../Interfaces/room';
import { Options } from './../Interfaces/options';
import { RequestOptions } from './../Interfaces/request.options';

@Injectable()
export class RoomService {
  private options: RequestOptions = {};
  private url: string;

  public rooms: Room[];

  constructor(private http: Http) { }

  resource(url: string) {
    this.url = 'http://api.agendamento-salas.com/api/' + url;
    return this;
  }

  list(options: Options = {}): Observable<Room>  {
      let url = this.url;

      if (options.limit === undefined) {
        options.limit = 10;
      }

      if (options.page === undefined) {
        options.page = 1;
      }

      url += '?limit=' + options.limit;
      url += '&page=' + options.page;

      return this.http.get(url, this.options)
        .pipe(map(res => res.json()))
        .catch(err => Observable.throw(err.message));
  }

  public save(data: object): Observable<any>  {
    return this.http.post(this.url, data, this.options)
    .pipe(map(res => res.json()))
    .catch(error => Observable.throw(error));
  }

  public update(id: number, data: object): Observable<any> {
    return this.http.put(this.url + '/' + id, data, this.options)
    .catch(error => Observable.throw(error));
  }

  public show(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id, this.options)
    .pipe(map(res => res.json()))
    .catch(error => Observable.throw(error));
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id, this.options)
        .toPromise()
        .then((res) => {
            return res.json() || {};
        });
  }

}
