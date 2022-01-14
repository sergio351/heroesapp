import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interface/heroes.interface';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environment.baseUrl;

  constructor (private http:HttpClient) { }
  getHeroes():Observable<Heroe[]>{
   return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(id:string ):Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino:string ):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6}`);
  }

  agregarheroe(heroe: Heroe): Observable<Heroe>{
return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  actualizarheroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
      }

  borrarheroe(id: string): Observable<any>{
        return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
          }
}
