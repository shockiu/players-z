import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { PlayerService } from '../../service/player.service';
import { saveAs } from 'file-saver';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit {

  playerInfo: any;
  showPlayer: boolean= false;
  wait: boolean =  false
  /**
   * @param {PlayerService} playerService	
   */
  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.playerService.searching$.pipe()
      .subscribe(res => {
        if (res) {
          this.showPlayer = false;
          this.wait = true;
          return;
        }
        this.wait= false;
    });

    this.playerService.player$.pipe(
      delay(2000),
    ).subscribe((player) => {
      this.playerService.searching$.next(false)
      this.showPlayer= true;
      this.playerInfo = player;
    })
  }

  ngOnDestroy() {

  }

  download() {
    this.playerService.download(this.playerInfo.url_image, this.playerInfo.name);
  }


}
