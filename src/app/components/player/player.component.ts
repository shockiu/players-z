import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayerService } from '../../service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {

  /**
   * @param {PlayerService} playerService	
   */
  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.playerService.player$.pipe().subscribe((player) => {
      console.log(player);
    })
  }

  ngOnDestroy() {

  }

}
