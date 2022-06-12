import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { PlayerService } from '../../service/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

  playerInfo: any;
  showPlayer: boolean= false;
  wait: boolean =  false
  unsubscribe: Subject<any>;
  /**
   * @param {PlayerService} playerService	
   */
  constructor(
    private playerService: PlayerService
  ) { 
    this.unsubscribe =  new Subject<any>();
  }

  ngOnInit() {
    this.playerService.searching$.pipe(
        takeUntil(this.unsubscribe)
      ).subscribe(res => {
        if (res) {
          this.showPlayer = false;
          this.wait = true;
          return;
        }
        this.wait= false;
    });

    this.playerService.player$.pipe(
      delay(2000),
      takeUntil(this.unsubscribe)
    ).subscribe((player) => {
      this.playerService.searching$.next(false)
      this.showPlayer= true;
      this.playerInfo = player;
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  download() {
    this.playerService.download(this.playerInfo.url_image, this.playerInfo.name);
  }


}
