import { AlertController, LoadingController } from '@ionic/angular';
import { AdsService } from './../../../services/ads/ads.service';
import { RouterPagePage } from './../../../shared/pages/router-page/router-page/router-page.page';
import { Ads } from './../../../models/ads';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/authentication/user/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-services-tab',
  templateUrl: './services-tab.page.html',
  styleUrls: ['./services-tab.page.scss'],
})
export class ServicesTabPage extends RouterPagePage implements OnInit, OnDestroy {


  anuncios: Ads[];
  email: string;
  usuario: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private adsService: AdsService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
  }

  onDestroy() {
    super.ngOnDestroy();
  }

  pageServicos() {
    this.router.navigateByUrl('/main/services/register');
  }

  viewOrUpdateAnuncio(anuncio: Ads) {
    console.log(anuncio);
    this.router.navigate(['/main/services/update'], {
      queryParams: anuncio
    });
  }

  onEnter() {

    this.authService.getUser().then((val) => {

      this.email = val;
      console.log(this.email);
      this.userService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;
        console.log(this.usuario);
        this.adsService.findByUserId(this.usuario.id).subscribe((response2) => {
          this.anuncios = response2;

          this.anuncios.forEach(anuncio => {
            anuncio.dataCadastroFormatted = moment(anuncio.dataCadastro).format('DD-MM-YYYY HH:MM:SS');
          });
          console.log(this.anuncios);
        },
          error => {
            console.log(error);
          });

      },
        error => {
          console.log(error);
          return null;
        });
    });

  }

}
