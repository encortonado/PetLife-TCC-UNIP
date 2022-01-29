import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from '../../../../models/pet';

@Component({
  selector: 'app-update-pet-page',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetProfilePage implements OnInit {

  pet = new Pet();

  constructor(private router: Router, public activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.activatedRoute.queryParams.subscribe((res) => {
      this.pet.id = res.id;
      this.pet.userId = res.userId;
      this.pet.descricao = res.descricao;
      this.pet.nome = res.nome;
      this.pet.idade = res.idade;
      this.pet.peso = res.peso;
      this.pet.raca = res.raca;
      this.pet.descricao = res.descricao;
      this.pet.petType = res.petType;


    });

    this.router.navigate(['/update'], {
      queryParams: this.pet
    });

  }

}