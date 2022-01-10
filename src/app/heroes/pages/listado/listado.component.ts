import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',

})
export class ListadoComponent implements OnInit {
  heroes: Heroe[]=[];

  constructor(private heroesservice : HeroesService) { }

  ngOnInit(): void {
      this.heroesservice.getHeroes()
      .subscribe(heroes=>this.heroes=heroes);
  }

}
