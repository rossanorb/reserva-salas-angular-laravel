import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DialogService {
    activate: (message?: string, title?: string) => Promise<boolean>;
}
