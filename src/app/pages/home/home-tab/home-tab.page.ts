import { User } from './../../../models/user';
import { Ads } from './../../../models/ads';
import { AlertController, LoadingController } from '@ionic/angular';
import { AdsService } from './../../../services/ads/ads.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/authentication/user/user.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  anuncios: Ads[];
  usuario: User;
  cidades: string[];
  cidade = '';
  servico = '';

  constructor(
    private router: Router,
    private adsService: AdsService,
    public userService: UserService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    console.log('Cidade e servico' + this.servico + this.cidade);

    if (!(this.cidade === 'Todos' && this.servico === '' || this.servico === 'Todos' && this.cidade === '')) {

      if (this.cidade === '' && this.servico === '') {
        this.adsService.findAll().subscribe((response) => {
          this.anuncios = response;
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });
      } else {

        console.log('Entrou no filtro ' + this.servico + this.cidade);
        this.adsService.findAllWithParameters(this.cidade, this.servico).subscribe(res => {
          this.anuncios = res;
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });

      }
    }

    this.userService.findAllCities().subscribe(res => {
      this.cidades = res;
      console.log(this.cidades);
    });

  }

  viewAnuncio(anuncio: Ads) {
    console.log(anuncio);
    this.router.navigate(['main/home/ad'], {
      queryParams: anuncio
    });
  }

  viewProfile(userId: string) {

    console.log(userId);
    this.userService.findUserById(userId).subscribe(res => {

      this.usuario = res;

      this.router.navigate(['/profile'], {
        queryParams: this.usuario
      });
    });
  }

  changeSelectedCity(event) {
    this.cidade = event.detail.value;
    console.log(event.detail.value);
    this.ionViewWillEnter();
  }

  changeSelectedService(event) {
    this.servico = event.detail.value;
    console.log(event.detail.value);
    this.ionViewWillEnter();
  }

}
