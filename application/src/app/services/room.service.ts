import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { Room } from './../Interfaces/Room';
import { map } from 'rxjs/operators';

interface Options {
  limit?: number;
  page?: number;
}

interface RequestOptions {
  headers?: any;
}

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

  update (id: number, data: Object) {
    return this.http.put(this.url + '/' + id, data, this.options)
        .toPromise()
        .then((res) => {
            return res.json() || {};
        });
  }

  public show(id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id, this.options)
        .toPromise()
        .then((res) => {
            return res.json() || {};
        });
  }

}
