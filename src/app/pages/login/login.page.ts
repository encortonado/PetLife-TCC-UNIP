import { Component, OnInit } from '@angular/core';
import { Authenticate } from 'src/app/models/authenticate';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  auth: Authenticate = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  login() {}

  register() {}

}
