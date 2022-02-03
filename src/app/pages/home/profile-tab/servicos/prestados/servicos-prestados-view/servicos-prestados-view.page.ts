import { ModRelatarProblemaPage } from './../../contratados/servicos-contratados-view/mod-relatar-problema/mod-relatar-problema.page';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from './../../../../../../services/authentication/user/user.service';
import { ScheduleService } from './../../../../../../services/pet/schedule/schedule.service';
import { AuthService } from './../../../../../../services/authentication/auth.service';
import { PetDTO } from './../../../../../../models/pet';
import { Component, OnInit } from '@angular/core';
import { ScheduleDTO } from 'src/app/models/schedule';
import { UserDTO } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicos-prestados-view',
  templateUrl: './servicos-prestados-view.page.html',
  styleUrls: ['./servicos-prestados-view.page.scss'],
})
export class ServicosPrestadosViewPage implements OnInit {

  agenda = new ScheduleDTO();
  msgReturn: string;
  pet = new PetDTO();
  anunciante = new UserDTO();
  cliente = new UserDTO();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private agendaService: ScheduleService,
    private usuarioService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.agenda.id = res.id;
      this.agenda.anuncianteId = res.anuncianteId;
      this.agenda.anuncioId = res.anuncioId;
      this.agenda.clienteId = res.clienteId;
      this.agenda.data = res.data;
      this.agenda.dataCadastro = res.dataCadastro;
      this.agenda.formaPagamento = res.formaPagamento;
      this.agenda.horario = res.horario;
      this.agenda.petId = res.petId;
      this.agenda.preco = res.preco;
      this.agenda.userNameAnuncio = res.userNameAnuncio;
      this.agenda.isActive = res.isActive;
      this.agenda.serviceName = res.serviceName;

      this.usuarioService.findUserAndPetById(this.agenda.anuncianteId, this.agenda.petId, this.agenda.clienteId).subscribe(res2 => {

        this.pet = res2.pet;
        this.anunciante = res2.anunciante;
        this.cliente = res2.cliente;
      },
        error => {
          console.log(error);
        });

    });

  }

  async showModalRelatarProblema() {
    const modal = await this.modalCtrl.create({
      component: ModRelatarProblemaPage,
      componentProps: {
        userReported: this.cliente,
        userReporter: this.anunciante,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  viewProfile() {

    this.router.navigate(['/main/home/profile'], {
      queryParams: this.cliente
    });
  }


}
