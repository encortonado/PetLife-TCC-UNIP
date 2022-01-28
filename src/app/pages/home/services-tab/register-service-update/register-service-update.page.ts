import { AdsService } from './../../../../services/ads/ads.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Ads } from './../../../../models/ads';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/authentication/user/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-service-update',
  templateUrl: './register-service-update.page.html',
  styleUrls: ['./register-service-update.page.scss'],
})
export class RegisterServiceUpdatePage implements OnInit {

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

  showEdit = false;

  msgReturn: string;
  email: string;
  usuario: User;
  isActive = true;

  public dias = [
    { val: 'Segunda', isChecked: false },
    { val: 'Terça', isChecked: false },
    { val: 'Quarta', isChecked: false },
    { val: 'Quinta', isChecked: false },
    { val: 'Sexta', isChecked: false },
    { val: 'Sabado', isChecked: false },
    { val: 'Domingo', isChecked: false }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService,
    private userService: UserService,
    private adsService: AdsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.anuncio.id = res.id;
      this.anuncio.descricao = res.descricao;
      this.anuncio.titulo = res.titulo;
      this.anuncio.preco = res.preco;
      this.anuncio.userId = res.userId;
      this.anuncio.dataCadastro = res.dataCadastro;
      this.anuncio.isActive = res.isActive;
      this.anuncio.segunda = res.segunda;
      this.anuncio.terca = res.terca;
      this.anuncio.quarta = res.quarta;
      this.anuncio.quinta = res.quinta;
      this.anuncio.sexta = res.sexta;
      this.anuncio.sabado = res.sabado;
      this.anuncio.domingo = res.domingo;
      this.anuncio.horario1 = res.horario1;
      this.anuncio.horario2 = res.horario2;
      this.anuncio.horario3 = res.horario3;
      this.anuncio.expirationTime = res.expirationTime;
      this.anuncio.userName = res.userName;

      console.log(this.anuncio.isActive);
      if (this.anuncio.isActive !== '1') {
        console.log('entrou');
        this.isActive = false;
      }

      console.log(this.anuncio);
    });
  }

  showEditView() {
    this.validateTitleAndPriceBack();
    this.showEdit = true;
  }

  dismissEditView() {
    this.validateTitleAndPrice();
    this.showEdit = false;
    this.ionViewWillEnter();
  }



  atualizarAnuncio() {

    this.validateTitleAndPrice();
    console.log(this.anuncio);


    this.adsService.atualizarAnuncio(this.anuncio)
      .subscribe((response2) => {

        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        this.presentAlert('Anuncio atualizado com sucesso!');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert('Ocorreu erro ao atualizar o anuncio. Por favor tente novamente mais tarde.');
          console.log(error);
        });
  }

  deleteAnuncio(id: string) {

    this.adsService.deleteAnuncioById(id).subscribe((response) => {
      console.log(response);
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlertDelete('Anuncio excluído com sucesso!');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao excluir o anuncio. Por favor tente novamente mais tarde.');
        console.log(error);
      });
  }


  // validações

  validateTitleAndPrice() {

    switch (this.anuncio.titulo) {
      case '1': {
        this.anuncio.titulo = 'Passeio de Pets';
        this.anuncio.preco = '100.00';
        break;
      }
      case '2': {
        this.anuncio.titulo = 'Hospedagem de Pets';
        this.anuncio.preco = '150.00';
        break;
      }
      case '3': {
        this.anuncio.titulo = 'Banho de Pets';
        this.anuncio.preco = '50.00';
        break;
      }
      case '4': {
        this.anuncio.titulo = 'Tosa de Pets';
        this.anuncio.preco = '50.00';
        break;
      }
      default: {
        break;
      }
    }

  }

  validateTitleAndPriceBack() {

    switch (this.anuncio.titulo) {
      case 'Passeio de Pets': {
        this.anuncio.titulo = '1';
        break;
      }
      case 'Hospedagem de Pets': {
        this.anuncio.titulo = '2';
        break;
      }
      case 'Banho de Pets': {
        this.anuncio.titulo = '3';
        break;
      }
      case 'Tosa de Pets': {
        this.anuncio.titulo = '4';
        break;
      }
      default: {
        break;
      }
    }

  }

  // dialogs

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

  async presentAlertDelete(mensagem) {
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
      message: 'Processando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
