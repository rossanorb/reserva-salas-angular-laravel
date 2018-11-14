import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from '../services/dialog.service';

const KEY_ESC = 27;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private _defaults = {
    title: '',
    message: 'Deseja executar essa ação?',
    cancelText: 'não',
    okText: 'sim'
  };

  title: string;
  message: string;
  okText: string;
  cancelText: string;

  private _closeButton: any;
  private _cancelButton: any;
  private _okButton: any;
  private _dialog: any;

  ngOnInit(): any {
    this._closeButton = document.getElementById('closeButton');
    this._cancelButton = document.getElementById('cancelButton');
    this._okButton = document.getElementById('okButton');
    this._dialog = document.getElementById('dialog');
  }

  constructor(dialogService: DialogService) {
    dialogService.activate = this.activate.bind(this);
  }

  activate(message = this._defaults.message, title = this._defaults.title) {
    this._setLabels(message, title);

    const promise = new Promise<boolean>(resolve => {
      this._show(resolve);
    });
    return promise;
  }

  _setLabels(message = this._defaults.message, title = this._defaults.title) {
    this.title = title;
    this.message = message;
    this.okText = this._defaults.okText;
    this.cancelText = this._defaults.cancelText;
  }

  private _show(resolve: (boolean) => any) {
    document.onkeyup = null;

    const negativeOnClick = (e: any) => resolve(false);
    const positiveOnClick = (e: any) => resolve(true);

    if (!this._closeButton || !this._cancelButton || !this._okButton) { return; }

    this._cancelButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!negativeOnClick(e)) { this._hideDialog(); }
    });

    this._okButton.onclick = ((e: any) => {
      e.preventDefault();
      if (!positiveOnClick(e)) { this._hideDialog(); }
    });

    this._closeButton.onclick = ((e: any) => {
      e.preventDefault();
      this._hideDialog();
      return negativeOnClick(null);
    });

    document.onkeyup = (e: any) => {
      if (e.which === KEY_ESC) {
        this._hideDialog();
        return negativeOnClick(null);
      }
    };

    this._dialog.style.display = 'block';

  }

  private _hideDialog() {
    document.onkeyup = null;
    this._dialog.style.display = 'none';
  }
}
