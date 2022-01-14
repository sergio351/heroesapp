import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id:'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel-Comics'
    }

  ];
  heroe: Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    publisher:Publisher.DCComics,
    first_appearance:'',
    alt_img:'',
  };

  constructor(private heroesService: HeroesService,
              private activetdRoute :ActivatedRoute,
              private router: Router ){ }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')){
      return;
    }
    this.activetdRoute.params
    .pipe(
      switchMap(({id})=>this.heroesService.getHeroePorId(id))
    )
    .subscribe(heroe=>this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim().length=== 0){
      return ;
    }

    if(this.heroe.id){
      this.heroesService.actualizarheroe(this.heroe).subscribe(heroe=>console.log('actualizando',heroe))

    }else
    {
      this.heroesService.agregarheroe(this.heroe)
      .subscribe(heroe=>{this.router.navigate(['/heroes/editar',heroe.id]);

    })

  }

  }

  borrarheroe(){
    this.heroesService.borrarheroe(this.heroe.id!)
    .subscribe(resp=>{
        this.router.navigate(['/heroes']);
    })
  }
}
