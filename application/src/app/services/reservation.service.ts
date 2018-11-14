import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


import 'rxjs/add/operator/toPromise';

interface Options {
    limit?: number;
    page?: number;
}

interface RequestOptions {
    headers?: any;
}

@Injectable()
export class ReservationService {
    private options: RequestOptions = {};
    private url: string;

    constructor(private http: Http) {}

    resource(url: string) {
        this.url = 'http://api.agendamento-salas.com/api/' + url;
        return this;
    }

    schedules(date: string) {
        return this.http.get(this.url + '/' + date, this.options)
        .toPromise()
        .then((res) => {
            return res.json() || {};
        });
    }

    make(data: Object) {
        return this.http.post(this.url, data, this.options)
        .toPromise()
        .then(
            (res) => {
                return res.json() || {};
            }
        )
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
