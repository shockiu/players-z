import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../service/player.service';

import { COUNTRY, SPORT, PLAYER } from '../../data/index';
import { Country, Sport, Player } from '../../interfaces/options.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public countrys: Country[] = [...COUNTRY];
  public sports: Sport[] = [...SPORT];
  public players: Player[] = [...PLAYER];

  infoPlayer: FormGroup;

  /**
   *  @param {PlayerService} playerService
   * @param {FormBuilder} fb
   */
  constructor(
    private playerService: PlayerService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.filterOptions();
  }

  ngOnDestroy() {
  }

  initForm() {
    this.infoPlayer = this.fb.group({
      country: ['',[Validators.required]],
      sport: ['', [Validators.required]],
      player: ['', [Validators.required]]
    });
  }

  get country() { return this.infoPlayer.get('country'); }
  get sport() { return this.infoPlayer.get('sport'); }
  get player() { return this.infoPlayer.get('player'); }

  get disabledSelectByCountry(): boolean {
    return this.country.value.length === 0;
  }

  get disabledSelectByCountryAndPlayer(): boolean {
    return this.country.value.length === 0 || this.sport.value.length === 0
  }

  filterOptions() {
    this.infoPlayer.valueChanges.subscribe((value) => {
      const { country, sport } = value;	
      if ( typeof country === 'number' && typeof sport === 'number' ) {
        let players = PLAYER;
        players = players.filter((player) => player.country_code === country 
                                            && player.sport_code === sport);
        this.players = players;
      }
    });

  }

  optionSelected(opt: any, id: number) {
    this.playerService.optionsSelected({opt, id});
  }

}
