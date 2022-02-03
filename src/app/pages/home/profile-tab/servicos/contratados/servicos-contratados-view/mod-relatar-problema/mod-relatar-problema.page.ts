import { EndServiceDTO } from './../../../../../../../models/end-service';
import { UserDTO } from './../../../../../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from './../../../../../../../models/schedule';
import { Router } from '@angular/router';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { SuportService } from 'src/app/services/helpers/suport/suport.service';

@Component({
  selector: 'app-mod-relatar-problema',
  templateUrl: './mod-relatar-problema.page.html',
  styleUrls: ['./mod-relatar-problema.page.scss'],
})
export class ModRelatarProblemaPage implements OnInit {

  @Input() userReporter: UserDTO;
  @Input() agenda: Schedule;
  @Input() userReported: UserDTO;

  msgReturn: string;
  service = new EndServiceDTO();
  userNameReported: string;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private suporteService: SuportService,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {

    this.userNameReported = this.userReported.nome;

  }

  relatar() {

    this.service.agendaId = this.agenda.id;
    this.service.userReported = this.userReported.email;
    this.service.userReporter = this.userReporter.email;

    console.log('comentario: ' + this.service.comentario);
    this.suporteService.relatarProblema(this.service).subscribe((response) => {
      this.msgReturn = 'SUCESSO';
      this.presentLoading();
      this.presentAlert('Problema reportado com sucesso. Responderemos o mais breve possível por email. Obrigado pela compreensão.');
    },
      error => {
        this.msgReturn = 'ERROR';
        this.presentLoading();
        this.presentAlert('Ocorreu erro ao reportar o problema. Por favor tente novamente mais tarde.');
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
