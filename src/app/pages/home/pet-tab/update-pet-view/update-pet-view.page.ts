import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AdsService } from './../../../../services/ads/ads.service';
import { Pet } from '../../../../models/pet';
import { AuthService } from '../../../../services/authentication/auth.service';
import { PetService } from '../../../../services/pet/pet.service';
import { RouterPagePage } from '../../../../shared/pages/router-page/router-page/router-page.page';
// import { FileChooser } from '@ionic-native/file-chooser/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';
// import { Base64 } from '@ionic-native/base64/ngx';
import { ImageService } from '../../../../services/helpers/profile/image.service';
import { PetImage } from '../../../../models/pet-image';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-pet-view',
  templateUrl: './update-pet-view.page.html',
  styleUrls: ['./update-pet-view.page.scss'],
})
export class ViewUpdatePetPage extends RouterPagePage implements OnDestroy {

  @ViewChild('avatar') profile: ElementRef;

  pet = new Pet();
  showEdit = false;

  msgReturn: string;
  email: string;

  dogsBreed = true;
  numbers = new Array();

  files: Observable<any[]>;
  petImage = new PetImage();
  petImageSave = new PetImage();
  public atpetGroup: FormGroup;
  public liberate = false;


  constructor(
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public adsService: AdsService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthService,
    public petService: PetService,
    private router: Router,
    // private fileChooser: FileChooser,
    // private filePath: FilePath,
    // private base64: Base64,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private atpetBuilder: FormBuilder
  ) {
    super(router, route);
    this.atpetGroup = this.atpetBuilder.group({

      nome: [this.pet.nome, [Validators.required]],
      idade: [this.pet.idade, [Validators.required]],
      peso: [this.pet.peso, [Validators.required]],
      Raca: [this.pet.raca, [Validators.required]],
      tipo: [this.pet.petType, null],
      descricao: [this.pet.descricao, null],
    });
  }

  liberating() {
    this.liberate = true;
  }

  onEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.pet.id = res.id;
      this.pet.userId = res.userId;
      this.pet.descricao = res.descricao;
      this.pet.nome = res.nome;
      this.pet.idade = res.idade;
      this.pet.peso = res.peso;
      this.pet.raca = res.raca;
      this.pet.descricao = res.descricao;
      this.pet.petType = res.petType;
      for (let index = 0; index <= 50; index++) {
        this.numbers.push(index);
      }

      this.imageService.findByPetId(this.pet.id).subscribe(res2 => {
        this.petImage = res2;
      });

    });
  }

  atualizarPet() {

    if (this.profile.nativeElement.files[0]) {
      this.pickFileAndGetBase64String();
    }

    this.petService.updatePet(this.pet)
      .subscribe((response2) => {
        this.msgReturn = 'SUCESSO';
        this.presentLoading();
        this.presentAlert('Pet atualizado com sucesso!', this.pet);
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoading();
          this.presentAlert('Ocorreu erro ao atualizar o Pet. Por favor tente novamente mais tarde.');
        });
  }

  async presentAlert(mensagem, param?) {
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

  async presentAlertDelete(mensagem, param?) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['main/pet']);
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
  }


  showEditView() {
    this.showEdit = true;
  }

  dismissEditView() {
    this.showEdit = false;
    this.onEnter();
  }

  deletePet(id: string) {
    this.petService.deletePetById(id).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlertDelete('Pet excluído com sucesso!');
      this.onEnter();
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao excluir o Pet. Por favor tente novamente mais tarde.');
      });
  }

  changeSelectBreeds(event) {

    if ('Cachorro' === event.detail.value) {
      this.dogsBreed = true;
    } else {
      this.dogsBreed = false;
    }

  }

  onDestroy() {
    super.ngOnDestroy();
  }

  pickFileAndGetBase64String() {

    let img = null;

    img = this.profile.nativeElement.files.item(0);

    console.log(this.profile.nativeElement.files[0]);

    let reader = new FileReader();

    reader.readAsDataURL(this.profile.nativeElement.files[0]);

    reader.onload = () => {
      //me.modelvalue = reader.result;
      console.log(reader.result);

      this.petImageSave.base64 = reader.result as string;
    };

    this.petImageSave.petId = this.pet.id;

    setTimeout(() => {
      this.imageService.savePetImage(this.petImageSave).subscribe(res => {
        this.msgReturn = 'SUCESSO';
        this.presentLoadingPhotoProfile();
        console.log(res);
        this.presentAlertPhotoProfile('Foto do Pet atualizada com sucesso.');
      },
        error => {
          this.msgReturn = 'ERROR';
          this.presentLoadingPhotoProfile();
          this.presentAlert('Ocorreu erro ao atualizar foto do Pet. Por favor tente novamente mais tarde.');
          console.log(error);
        });
    }, 2000);


  }

  async presentLoadingPhotoProfile() {
    const loading = await this.loadingController.create({
      message: 'Atualizando foto do Pet',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentAlertPhotoProfile(mensagem) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/main/pet/update'], {
            queryParams: this.pet
          });
        }
      }]
    });

    await setTimeout(() => { alert.present(); }, 2000);
  }

}
