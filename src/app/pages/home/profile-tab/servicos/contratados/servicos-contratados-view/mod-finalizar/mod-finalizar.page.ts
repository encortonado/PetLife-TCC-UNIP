import { ScheduleService } from './../../../../../../../services/pet/schedule/schedule.service';
import { EndServiceDTO } from './../../../../../../../models/end-service';
import { UserDTO } from './../../../../../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleDTO } from 'src/app/models/schedule';
import { Router } from '@angular/router';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mod-finalizar',
  templateUrl: './mod-finalizar.page.html',
  styleUrls: ['./mod-finalizar.page.scss'],
})
export class ModFinalizarPage implements OnInit {

  @Input() anunciante: UserDTO;
  @Input() agenda: ScheduleDTO;
  msgReturn: string;
  service = new EndServiceDTO();

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private agendaService: ScheduleService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  finalizar() {

    this.service.agendaId = this.agenda.id;
    this.service.anuncianteId = this.anunciante.id;

    console.log('comentario: ' + this.service.comentario);
    this.agendaService.finalizarAnuncio(this.service).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlert('Serviço finalizado com sucesso. Agradecemos pela sua confiança.');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao finalizar o serviço. Por favor tente novamente mais tarde.');
      });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async presentAlert(mensagem, param?) {
    const alert = await this.alertController.create({
      header: this.msgReturn,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.close();
          this.router.navigate(['/main/profile/contratados']);
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


}
