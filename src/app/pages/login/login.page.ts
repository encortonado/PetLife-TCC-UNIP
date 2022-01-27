import { AuthService } from './../../services/authentication/auth.service';
import { AuthenticateResponse } from './../../models/authenticate-response';
import { AuthenticateService } from './../../services/authentication/user/authenticate.service';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticate } from 'src/app/models/authenticate';
import { GlobalParameters } from 'src/app/shared/parameters/global-parameters';

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

  public authResponse: AuthenticateResponse;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService,
    private authService: AuthService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public parameters: GlobalParameters,
    public platform: Platform
    ) { }

  ngOnInit() {
  }

  login() {

    this.authenticateService.autenticar(this.auth).subscribe((response) => {

      this.parameters.setUsuarioLogado(response);
      this.authResponse = this.parameters.getUsuarioLogado();

      console.log(this.authResponse.authenticate);

      if (this.authResponse.authenticate) {
        console.log('Bem vindo ' + this.authResponse.nome);
        this.presentLoading();
        this.logon(this.auth.email);

        setTimeout(() => {
          this.router.navigateByUrl('/main');
        },2001);
      } else {
        this.msgHeader = 'Authenticate Failure';
        this.msgBody = 'Usuário ou Senha inválidos!';
        this.presentLoading();
        this.presentAlert();
      }
    },
      error => {
        console.log(error);
      });
  }

  async logon(userEmail: string) {
    await setTimeout(() => { this.authService.login(userEmail); }, 2000);
  }

  register() {

    this.router.navigateByUrl('/sign-up');
  }



  // todo criar generico pra esses caras

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.msgHeader,
      message: this.msgBody,
      buttons: ['OK']
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Autenticando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
