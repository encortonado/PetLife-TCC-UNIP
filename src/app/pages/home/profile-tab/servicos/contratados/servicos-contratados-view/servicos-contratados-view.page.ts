import { ModRelatarProblemaPage } from './mod-relatar-problema/mod-relatar-problema.page';
import { ModFinalizarPage } from './mod-finalizar/mod-finalizar.page';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { UserService } from './../../../../../../services/authentication/user/user.service';
import { UserDTO } from './../../../../../../models/user';
import { Pet, PetDTO } from './../../../../../../models/pet';
import { Component, OnInit } from '@angular/core';
import { ScheduleDTO } from 'src/app/models/schedule';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicos-contratados-view',
  templateUrl: './servicos-contratados-view.page.html',
  styleUrls: ['./servicos-contratados-view.page.scss'],
})
export class ServicosContratadosViewPage implements OnInit {

  agenda = new ScheduleDTO();
  msgReturn: string;
  pet = new PetDTO();
  anunciante = new UserDTO();
  cliente = new UserDTO();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
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

      this.userService.findUserAndPetById(this.agenda.anuncianteId, this.agenda.petId, this.agenda.clienteId).subscribe(res2 => {

        this.pet = res2.pet;
        this.anunciante = res2.anunciante;
        this.cliente = res2.cliente;

      },
        error => {
          console.log(error);
        });

    });

  }

  async showModalFinalizar() {
    const modal = await this.modalCtrl.create({
      component: ModFinalizarPage,
      componentProps: {
        anunciante: this.anunciante,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  async showModalRelatarProblema() {
    const modal = await this.modalCtrl.create({
      component: ModRelatarProblemaPage,
      componentProps: {
        userReported: this.anunciante,
        userReporter: this.cliente,
        agenda: this.agenda
      }
    });
    modal.present();
  }

  viewProfile() {

    this.router.navigate(['main/home/profile'], {
      queryParams: this.anunciante
    });
  }

}
