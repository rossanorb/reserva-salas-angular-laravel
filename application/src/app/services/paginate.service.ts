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
export class PaginateService {
    private options: RequestOptions = {};
    private url: string;

    constructor(private http: Http) {}

    resource(url: string) {
        this.url = 'http://api.agendamento-salas.com/api/' + url;
        return this;
    }

    list (options: Options = {}) {
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
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }

}
