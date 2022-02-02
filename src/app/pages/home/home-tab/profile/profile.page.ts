import { ImageService } from './../../../../services/helpers/profile/image.service';
import { UserImageDTO } from './../../../../models/user-image';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../../../../services/helpers/profile/comments.service';
import { Comment } from './../../../../models/comment';

import * as moment from 'moment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario = new UserDTO();
  comentarios: Comment[];
  userImage = new UserImageDTO();

  constructor(
    private activatedRoute: ActivatedRoute,
    private comentarioService: CommentsService,
    private imageService: ImageService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.activatedRoute.queryParams.subscribe((res) => {
      this.usuario.nome = res.nome;
      this.usuario.dataNascimento = moment.unix(res.dataNascimento / 1000).format('DD/MM/YYYY');
      this.usuario.estado = res.estado;
      this.usuario.cidade = res.cidade;
      this.usuario.email = res.email;
      this.usuario.id = res.id;

      this.imageService.findByUserId(this.usuario.id).subscribe(res2 => {
        this.userImage = res2;
      });
    });

    this.comentarioService.findByUserId(this.usuario.id).subscribe(res => {
      this.comentarios = res;

      this.comentarios.forEach(element => {
        element.dataCadastro = moment.unix(Number(element.dataCadastro) / 1000).format('DD/MM/YYYY');
      });
      console.log(this.comentarios);
    });

  }

}
