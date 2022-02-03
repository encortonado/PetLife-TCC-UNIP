import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from './../../../../../services/authentication/user/user.service';
import { AuthService } from './../../../../../services/authentication/auth.service';
import { ScheduleService } from './../../../../../services/pet/schedule/schedule.service';
import { UserDTO } from './../../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Schedule, ScheduleDTO } from './../../../../../models/schedule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestados',
  templateUrl: './prestados.page.html',
  styleUrls: ['./prestados.page.scss'],
})
export class PrestadosPage implements OnInit {

  agendas: Schedule[];
  email;
  usuario = new UserDTO();
  showServices = 'andamento';

  constructor(
    private router: Router,
    private agendaService: ScheduleService,
    private authService: AuthService,
    private usuarioService: UserService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authService.getUser().then((val) => {

      this.email = val;
      this.usuarioService.findUserByEmail(this.email).subscribe((response) => {

        this.usuario = response;

        this.agendaService.findByAnuncianteId(this.usuario.id).subscribe((response2) => {
          this.agendas = response2;
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

  changeSelected(event) {

    if ('todos' === event.detail.value) {
      this.showServices = 'todos';
    } else if ('concluido' === event.detail.value) {
      this.showServices = 'concluido';
    } else {
      this.showServices = 'andamento';
    }

  }

  viewServico(agenda: ScheduleDTO) {
    console.log(agenda);
    this.router.navigate(['main/profile/contratados/view'], {
      queryParams: agenda
    });
  }

}
