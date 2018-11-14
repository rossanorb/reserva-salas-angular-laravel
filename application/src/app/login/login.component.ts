import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


interface User {
    username?: string;
    password?: string;
}

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user: User = {};

  constructor(
      private httpService: LoginService,
      private router: Router
  ) {}

  public login() {
      const auth = {
          grant_type: 'password',
          client_id: '2',
          client_secret: 'tNEfs16Zhwcj1NlPVGyw8g7g0khnqxoDlUSOVWEW',
          username: this.user.username,
          password: this.user.password,
          scope: '',
      };

      this.httpService.client('oauth/token').insert(auth)
          .then((res) => {
              localStorage['tokens'] = JSON.stringify(res);
              this.httpService.setAccessToken(res.access_token);
              this.router.navigate(['/']);
          });
  }
}
