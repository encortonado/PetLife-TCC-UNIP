import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  msgHeader = '';
  msgBody = '';
  backButtonSubscription;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {}

  register() {
    this.router.navigateByUrl('/sign-up');
  }

}
