import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/authentication/user/user.service';
import { Pet } from '../../../models/pet';
import { AuthService } from '../../../services/authentication/auth.service';
import { PetService } from '../../../services/pet/pet.service';
import { RouterPagePage } from '../../../shared/pages/router-page/router-page/router-page.page';
import { PetImageDTO } from './../../../models/pet-image';

@Component({
  selector: 'app-pet-tab',
  templateUrl: './pet-tab.page.html',
  styleUrls: ['./pet-tab.page.scss'],
})
export class PetTabPage extends RouterPagePage implements OnDestroy  {

  constructor(
    public navCtrl: NavController,
    public petService: PetService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthService,
    public UserService: UserService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { 
      super(router, ActivatedRoute);
  }

  pets: Pet[];
  email: string;
  usuario: User;

  petImage = new PetImageDTO();
  petImageSave = new PetImageDTO();

  pageServicos() {
    this.router.navigateByUrl('/main/pet/register');
  }

  onEnter() {

    this.authService.getUser().then((val) => {

      this.email = val;
      this.UserService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;

        this.petService.findByUserId(this.usuario.id).subscribe((response2) => {
          this.pets = response2;
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


  viewOrUpdatePet(pet: Pet) {
    console.log(pet);
    this.router.navigate(['/main/pet/update'], {
      queryParams: pet
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}