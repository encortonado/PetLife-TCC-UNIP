import { AdsService } from './../../../../../services/ads/ads.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Ads } from './../../../../../models/ads';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from './../../../../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/authentication/auth.service';
import { UserService } from '../../../../../services/authentication/user/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.page.html',
  styleUrls: ['./register-service.page.scss'],
})
export class RegisterServicePage implements OnInit {

  anuncio: Ads = {
    id: null,
    titulo: '',
    descricao: '',
    userId: null,
    userName: null,
    preco: null,
    dataCadastro: null,
    dataCadastroFormatted: null,
    dataAtualizacao: null,
    segunda: null,
    terca: null,
    quarta: null,
    quinta: null,
    sexta: null,
    sabado: null,
    domingo: null,
    horario1: '',
    horario2: '',
    horario3: '',
    horario1Disp: null,
    horario2Disp: null,
    horario3Disp: null,
    isActive: null,
    expirationTime: null
  };

  msgReturn: string;
  email: string;
  usuario: User;
  public servicoGroup: FormGroup;

  public dias = [
    { val: 'Segunda', isChecked: false },
    { val: 'Terça', isChecked: false },
    { val: 'Quarta', isChecked: false },
    { val: 'Quinta', isChecked: false },
    { val: 'Sexta', isChecked: false },
    { val: 'Sabado', isChecked: false },
    { val: 'Domingo', isChecked: false }
  ];

  horario1: string;
  horario2: string;
  horario3: string;
  tempoAnuncio: string;


  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private userService: UserService,
    private adsService: AdsService,
    private fb: FormBuilder
  ) {

    this.servicoGroup = this.fb.group({

      titulo: [this.anuncio.titulo, [Validators.required]],
      descricao: [this.anuncio.descricao, [Validators.required]],
      dias: [this.dias, [Validators.required]],
      h1: [this.anuncio.horario1, [Validators.required]],
      h2: [this.anuncio.horario2],
      h3: [this.anuncio.horario3],

    });

  }

  ngOnInit() {
  }

  checkValue(event) {
    this.tempoAnuncio = event.detail.value;
  }

  ionViewWillEnter() {
    this.anuncio.titulo = '1';
    this.horario1 = '';
    this.horario2 = '';
    this.horario3 = '';
  }

  cadastrarAnuncio() {

    this.authService.getUser().then((val) => {

      this.email = val;
      this.userService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;
        this.anuncio.userId = this.usuario.id;
        this.anuncio.userName = this.usuario.nome;
        this.anuncio.expirationTime = this.tempoAnuncio;

        this.validateHours();
        this.validateDays();
        this.validateTitleAndPrice();
        this.adsService.novoAnuncio(this.anuncio)
          .subscribe((response2) => {
            this.msgReturn = 'SUCESSO';
            this.presentLoading();
            console.log(response2);
            this.presentAlert(response2);
          },
            error => {
              this.msgReturn = 'ERROR';
              this.presentLoading();
              this.presentAlert('Ocorreu erro ao cadastrar o anuncio. Por favor tente novamente mais tarde.');
              console.log(error);
            });
      },
        error => {
          console.log(error);
          return null;
        });
    });

  }


  // validações

  validateDays() {

    this.anuncio.segunda = 'false';
    this.anuncio.terca = 'false';
    this.anuncio.quarta = 'false';
    this.anuncio.quinta = 'false';
    this.anuncio.sexta = 'false';
    this.anuncio.sabado = 'false';
    this.anuncio.domingo = 'false';

    this.dias.forEach(element => {

      if (element.isChecked) {

        switch (element.val) {
          case 'Segunda':
            this.anuncio.segunda = 'true';
            break;
          case 'Terça':
            this.anuncio.terca = 'true';
            break;
          case 'Quarta':
            this.anuncio.quarta = 'true';
            break;
          case 'Quinta':
            this.anuncio.quinta = 'true';
            break;
          case 'Sexta':
            this.anuncio.sexta = 'true';
            break;
          case 'Sabado':
            this.anuncio.sabado = 'true';
            break;
          case 'Domingo':
            this.anuncio.domingo = 'true';
            break;

          default:
            break;
        }

      }

    });
  }

  validateHours() {

    if (this.horario1 !== '') {
      this.horario1 = moment(this.horario1).format('HH');
    }

    if (this.horario2 !== '') {
      this.horario2 = moment(this.horario2).format('HH');
    }

    if (this.horario3 !== '') {
      this.horario3 = moment(this.horario3).format('HH');
    }

    if (this.horario1 === this.horario2) {
      this.horario2 = '';
    }

    if (this.horario1 === this.horario3) {
      this.horario3 = '';
    }

    if (this.horario2 === this.horario3) {
      this.horario3 = '';
    }

    this.anuncio.horario1 = this.horario1;
    this.anuncio.horario2 = this.horario2;
    this.anuncio.horario3 = this.horario3;

  }

  validateTitleAndPrice() {

    switch (this.anuncio.titulo) {
      case '1': {
        this.anuncio.titulo = 'Passeio de Pets';
        this.anuncio.preco = '50.00';
        break;
      }
      case '2': {
        this.anuncio.titulo = 'Hospedagem de Pets';
        this.anuncio.preco = '150.00';
        break;
      }
      case '3': {
        this.anuncio.titulo = 'Banho de Pets';
        this.anuncio.preco = '30.00';
        break;
      }
      case '4': {
        this.anuncio.titulo = 'Tosa de Pets';
        this.anuncio.preco = '30.00';
        break;
      }
      default: {
        break;
      }
    }

  }



  // todo generico dialogs

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/main/services']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cadastrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
