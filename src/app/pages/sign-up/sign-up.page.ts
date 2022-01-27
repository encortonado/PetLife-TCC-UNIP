import { UserService } from './../../services/authentication/user/user.service';
import { Address } from './../../models/address';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CepService } from 'src/app/services/helpers/cep.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  msgReturn = '';
  dataFromService: any = '';
  user: User = {
    id: '',
    email: '',
    nome: '',
    dataNascimento: '',
    password: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    rate : null,
    dataAtualizacao : '',
    dataCadastro : '',
    ddd : null,
    telefone : null
  };
  endereco: Address;
  public fg: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private cepService: CepService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {



    this.fg = this.fb.group({

      nome: [this.user.nome, [Validators.required]],
      dataNascimento: [this.user.dataNascimento, [Validators.required]],
      ddd: [this.user.ddd, [Validators.required]],
      telefone: [this.user.telefone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: [this.user.email, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      cep: [this.user.cep],
      logradouro: [this.user.logradouro, [Validators.required]],
      numero: [this.user.numero, [Validators.required]],
      complemento: [this.user.complemento],
      bairro: [this.user.bairro, [Validators.required]],
      cidade: [this.user.cidade, [Validators.required]],
      estado: [this.user.estado, [Validators.required]],
    });
  }

  ngOnInit() {


  }

  registrar() {

    this.user.dataCadastro = new Date().toISOString();
    this.userService.registrar(this.user)
      .subscribe((response) => {
        this.msgReturn = 'SUCESSO';
        this.dataFromService = JSON.stringify(response);
        this.presentLoading();
        console.log(response);
        this.presentAlert(response);
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlertCepError(error.error);
          console.log(error);

        });

    // this.fg.valid
    console.log(this.fg.value);
  }

  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }


  async presentAlertCepError(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: ['OK']
    });
    console.log('Alerta');
    alert.present();

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  incluirEnderecoNoAnuncio(endereco: Address) {

    this.user.cep = this.endereco.cep;
    this.user.bairro = this.endereco.bairro;
    this.user.cidade = this.endereco.localidade;
    this.user.complemento = this.endereco.complemento;
    this.user.estado = this.endereco.uf;
    this.user.logradouro = this.endereco.logradouro;

  }

  buscarEndereco() {
    this.cepService.buscar(this.user.cep).subscribe((response) => {
      this.endereco = response;
      this.incluirEnderecoNoAnuncio(this.endereco);
      console.log(this.endereco);
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentAlertCepError('Não foi possível localizar o CEP informado ' + this.user.cep);
      });
  }

}
