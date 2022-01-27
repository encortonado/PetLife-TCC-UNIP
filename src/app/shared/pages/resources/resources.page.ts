import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit, OnDestroy {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController) { }


  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
