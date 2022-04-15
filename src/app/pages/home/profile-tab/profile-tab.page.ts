import { AlertController, LoadingController } from '@ionic/angular';
import { ImageService } from './../../../services/helpers/profile/image.service';
import { CepService } from './../../../services/helpers/cep.service';
import { AuthService } from './../../../services/authentication/auth.service';
import { AuthenticateResponse } from './../../../models/authenticate-response';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserImageDTO } from './../../../models/user-image';
import { AddressDTO } from './../../../models/address';
import { UserDTO } from './../../../models/user';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterPagePage } from './../../../shared/pages/router-page/router-page/router-page.page';
import { UserService } from './../../../services/authentication/user/user.service';
import { GlobalParameters } from './../../../shared/parameters/global-parameters';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import * as moment from 'moment';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage extends RouterPagePage implements OnDestroy {

  @ViewChild('avatar') profile: ElementRef;

  public liberate = false;

  auth: AuthenticateResponse;
  usuario = new UserDTO();
  email: string;
  showEdit = false;
  msgReturn = '';
  endereco = new AddressDTO();
  dataNascimento;
  dataCadastro;
  files: Observable<any[]>;
  userImage = new UserImageDTO();
  userImageSave = new UserImageDTO();
  public atGroup: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private cepService: CepService,
    private imageService: ImageService,
    private parameters: GlobalParameters,
    private alertController: AlertController,
    private loadingController: LoadingController,

  ) {
    super(router, activatedRoute);

    this.atGroup = this.fb.group({

      nome: [this.usuario.nome, [Validators.required]],
      dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
      ddd: [this.usuario.ddd, [Validators.required, Validators.maxLength(2)]],
      telefone: [this.usuario.telefone, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: [this.usuario.email, [Validators.required]],
      cep: [this.usuario.cep],
      logradouro: [this.usuario.logradouro, [Validators.required]],
      complemento: [this.usuario.complemento],
      numero: [this.usuario.numero, [Validators.required]],
      bairro: [this.usuario.bairro, [Validators.required]],
      cidade: [this.usuario.cidade, [Validators.required]],
      estado: [this.usuario.estado, [Validators.required]],
    });

  }

  liberating() {
    this.liberate = true;
  }


  onEnter() {

    this.authService.getUser().then((val) => {
      this.email = val;
      console.log('USER LOGGIN: ' + this.email);

      this.userService.findUserByEmail(this.email).subscribe((res) => {
        this.usuario.nome = res.nome;
        this.usuario.id = res.id;
        this.usuario.bairro = res.bairro;
        this.usuario.cep = res.cep;
        this.usuario.cidade = res.cidade;
        this.usuario.complemento = res.complemento;
        this.dataNascimento = moment(res.dataNascimento).format('DD/MM/YYYY');
        this.dataCadastro = moment(res.dataCadastro).format('DD/MM/YYYY');
        this.usuario.dataCadastro = res.dataCadastro;
        this.usuario.dataNascimento = new Date(res.dataNascimento).toISOString();
        this.usuario.email = res.email;
        this.usuario.estado = res.estado;
        this.usuario.logradouro = res.logradouro;
        this.usuario.numero = res.numero;
        this.usuario.password = res.password;
        this.usuario.dataAtualizacao = res.dataAtualizacao;
        this.usuario.email = res.email;
        this.usuario.rate = res.rate;
        this.usuario.ddd = res.ddd;
        this.usuario.telefone = res.telefone;

        this.imageService.findByUserId(this.usuario.id).subscribe(res2 => {
          this.userImage = res2;
        });

      },
        error => {
          console.log(error);
        });
    });

  }


  logout() {
    // this.authService.logout();
    this.router.navigateByUrl('');
  }

  editProfile() {
    this.showEdit = true;
  }

  cancelEditProfile() {
    this.showEdit = false;
  }

  buscarEndereco() {
    this.cepService.buscar(this.usuario.cep).subscribe((response) => {
      this.endereco = response;
      this.incluirEnderecoNoAnuncio(this.endereco);
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentAlert('Não foi possível localizar o CEP informado ' + this.usuario.cep);
        console.log(error);
      });
  }

  incluirEnderecoNoAnuncio(endereco: AddressDTO) {

    this.usuario.cep = this.endereco.cep;
    this.usuario.bairro = this.endereco.bairro;
    this.usuario.cidade = this.endereco.localidade;
    this.usuario.complemento = this.endereco.complemento;
    this.usuario.estado = this.endereco.uf;
    this.usuario.logradouro = this.endereco.logradouro;

  }


  updateProfile() {

    if (this.profile.nativeElement.files[0]) {
      this.pickFileAndGetBase64String();
    }

    this.usuario.dataAtualizacao = new Date().toISOString();
    console.log(this.usuario.dataNascimento);
    this.userService.update(this.usuario)
      .subscribe((response) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        console.log(response);
        this.presentAlert('Usuario atualizado com sucesso!');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert('Ocorreu erro ao atualizar o perfil. Por favor tente novamente mais tarde.');
          console.log(error);
        });
  }


  // todo
  servicosContratados() {
    this.router.navigate(['main/profile/contratados']);
  }

  //todo
  servicosPrestados() {
    this.router.navigate(['main/profile/prestados']);
  }


  // todo
  // pickFileAndGetBase64String() {

  //   this.fileChooser.open().then((value) => {
  //     this.presentAlert('esotu aqui showOpenWithDialog');

  //     this.filePath.resolveNativePath(value).then((nativepath) => {

  //       this.presentAlert('esotu aqui resolveNativePath');

  //       const base64string = btoa(nativepath);

  //       this.userImageSave.userId = this.usuario.id;
  //       this.userImageSave.base64 = base64string;

  //       this.imageService.saveImage(this.userImageSave).subscribe(res => {
  //         this.msgReturn = 'SUCESSO';
  //         this.presentLoadingPhotoProfile();
  //         console.log(res);
  //         this.presentAlertPhotoProfile('Foto de perfil atualizada com sucesso.');
  //       },
  //         error => {
  //           this.msgReturn = 'ERROR';
  //           this.presentLoadingPhotoProfile();
  //           this.presentAlert('Ocorreu erro ao atualizar foto de perfil. Por favor tente novamente mais tarde.');
  //           console.log(error);
  //         });

  //     });

  //   });


  // }

  pickFileAndGetBase64String() {

    let img = null;

    img = this.profile.nativeElement.files.item(0);

    console.log(this.profile.nativeElement.files[0]);

    let reader = new FileReader();

    reader.readAsDataURL(this.profile.nativeElement.files[0]);

    reader.onload = () => {
      //me.modelvalue = reader.result;
      console.log(reader.result);

      this.userImageSave.base64 = reader.result as string;
    };

    this.userImageSave.userId = this.usuario.id;

    setTimeout(() => {
      this.imageService.saveImage(this.userImageSave).subscribe(res => {
        this.msgReturn = 'SUCESSO';
        this.presentLoadingPhotoProfile();
        console.log(res);
        this.presentAlertPhotoProfile('Foto de perfil atualizada com sucesso.');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoadingPhotoProfile();
          this.presentAlert('Ocorreu erro ao atualizar foto de perfil. Por favor tente novamente mais tarde.');
          console.log(error);
        });
    }, 2000);


  }

  async selectPhoto() {
    const img = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    return img.base64String;
  }


  async presentAlert(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.showEdit = false;
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentAlertPhotoProfile(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['main/profile']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

  async presentAlertImagePicker() {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: `<label for="avatar">Choose a profile picture:</label>
      <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" #avatar  hidden/>`,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['main/profile']);
        }
      },
      {
        text: 'Cancelar',
        handler: () => {
          this.router.navigate(['main/profile']);
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 200);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Atualizando Usuário',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingPhotoProfile() {
    const loading = await this.loadingController.create({
      message: 'Atualizando foto de perfil',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  onDestroy() {
    super.ngOnDestroy();
  }

}
