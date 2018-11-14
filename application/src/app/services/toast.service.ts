import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ToastService {

    public eventToast = new EventEmitter<any>();
    private _msg: string;
    private _status: string;

    constructor() {}

    public getMessage() {
        return this._msg;
    }

    public getStatus() {
        return this._status;
    }

    public message( msg: any) {
      this._msg = msg.message;
      this._status = msg.status;
      this.eventToast.emit(msg);
    }

}
