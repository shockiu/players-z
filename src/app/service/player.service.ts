import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player, Country, Sport } from '../interfaces/options.interface';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public country: Country;
  public sport: Sport;
  public player$: Subject<any>;

  constructor() { 
  
    this.player$ = new Subject();
  }

  optionsSelected({...options}) {
    switch (options.id) {
      case 1:
        this.country = options.opt;
        break;
      case 2:
        this.sport = options.opt;
        break;
      case 3:
        const country = this.country.name;
        const sport = this.sport.name;
        this.player$.next({
          ...this.country,
          ...this.sport,
          ...options.opt,
          country,
          sport
        });
        break;
    }
  }

}
