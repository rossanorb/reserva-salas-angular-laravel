import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Options {
    limit?: number;
    page?: number;
}

@Injectable()
export class LoginService {
    private url: string;
    private header: Headers;

    constructor (private http: Http) {
        const token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
        if (token.access_token) {
            this.setAccessToken(token.access_token);
        }
    }

    setAccessToken (token: string) {
        this.header = new Headers({
            'Authorization': 'Bearer ' + token
        });
    }

    client(url: string) {
        this.url = 'http://api.agendamento-salas.com/' + url;
        return this;
    }

    insert (data: Object) {
        return this.http.post(this.url, data, {headers: this.header})
            .toPromise()
            .then((res) => {
                return res.json() || {};
            });
    }


}
